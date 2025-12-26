import type { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';
import { sql } from '@vercel/postgres';
import { google } from 'googleapis';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
};

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('API called - Method:', req.method);
  console.log('Environment variables present:', {
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
    hasSalonEmail: !!process.env.SALON_EMAIL,
    hasSendGrid: !!process.env.SENDGRID_API_KEY
  });

  // Add CORS headers to all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bookingData: BookingData = req.body;

    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.phone ||
      !bookingData.service || !bookingData.date || !bookingData.time) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'phone', 'service', 'date', 'time']
      });
    }

    // Initialize results tracking
    const results: any = {
      email: { sent: false, error: null },
      database: { saved: false, error: null },
      calendar: { added: false, error: null },
      sms: { sent: false, error: null }
    };

    // === 1. EMAIL SERVICE (SendGrid OR Gmail) ===
    try {
      let emailSent = false;

      // Try SendGrid first
      if (process.env.SENDGRID_API_KEY) {
        try {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);

          // Email to salon owner
          const salonMsg = {
            to: process.env.SALON_EMAIL || 'mudetorenee@gmail.com',
            from: process.env.SENDGRID_VERIFIED_EMAIL || process.env.SALON_EMAIL || 'mudetorenee@gmail.com',
            replyTo: bookingData.email,
            subject: `New Booking Request - ${bookingData.service}`,
            text: formatBookingEmail(bookingData),
            html: formatBookingEmailHTML(bookingData),
          };

          // Email to customer
          const customerMsg = {
            to: bookingData.email,
            from: process.env.SENDGRID_VERIFIED_EMAIL || process.env.SALON_EMAIL || 'mudetorenee@gmail.com',
            subject: 'Booking Confirmation - Re Beauty Salon',
            text: formatCustomerConfirmation(bookingData),
            html: formatCustomerConfirmationHTML(bookingData),
          };

          await sgMail.send(salonMsg);
          await sgMail.send(customerMsg);
          emailSent = true;
          console.log('Email sent via SendGrid');
        } catch (sgError: any) {
          console.error('SendGrid error:', sgError);
          // Continue to try Gmail
        }
      }

      // Try Gmail/Nodemailer if SendGrid failed or not configured
      if (!emailSent && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_APP_PASSWORD
            }
          });

          // Email to salon owner
          await transporter.sendMail({
            from: `"Re Beauty Salon" <${process.env.GMAIL_USER}>`,
            to: process.env.SALON_EMAIL || 'mudetorenee@gmail.com',
            replyTo: bookingData.email,
            subject: `New Booking Request - ${bookingData.service}`,
            text: formatBookingEmail(bookingData),
            html: formatBookingEmailHTML(bookingData),
          });

          // Email to customer
          await transporter.sendMail({
            from: `"Re Beauty Salon" <${process.env.GMAIL_USER}>`,
            to: bookingData.email,
            subject: 'Booking Confirmation - Re Beauty Salon',
            text: formatCustomerConfirmation(bookingData),
            html: formatCustomerConfirmationHTML(bookingData),
          });

          emailSent = true;
          console.log('Email sent via Gmail');
        } catch (gmailError: any) {
          console.error('Gmail error:', gmailError);
          results.email.error = gmailError.message;
        }
      }

      if (emailSent) {
        results.email.sent = true;
      } else if (!process.env.SENDGRID_API_KEY && !process.env.GMAIL_USER) {
        results.email.error = 'No email service configured';
      }
    } catch (error: any) {
      console.error('Email error:', error);
      results.email.error = error.message;
    }

    // === 2. VERCEL POSTGRES DATABASE ===
    try {
      if (process.env.POSTGRES_URL) {
        // Create table if it doesn't exist
        await sql`
          CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            service VARCHAR(100) NOT NULL,
            booking_date DATE NOT NULL,
            booking_time VARCHAR(20) NOT NULL,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;

        // Insert booking
        await sql`
          INSERT INTO bookings (name, email, phone, service, booking_date, booking_time, message)
          VALUES (${bookingData.name}, ${bookingData.email}, ${bookingData.phone}, 
                  ${bookingData.service}, ${bookingData.date}, ${bookingData.time}, 
                  ${bookingData.message || ''})
        `;
        results.database.saved = true;
      }
    } catch (error: any) {
      console.error('Database error:', error);
      results.database.error = error.message;
    }

    // === 3. GOOGLE CALENDAR ===
    try {
      if (process.env.GOOGLE_CALENDAR_ID && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
        const auth = new google.auth.JWT(
          process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          undefined,
          process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          ['https://www.googleapis.com/auth/calendar']
        );

        const calendar = google.calendar({ version: 'v3', auth });

        // Parse date and time
        const [year, month, day] = bookingData.date.split('-');
        const [time, period] = bookingData.time.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        const startDateTime = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hours, minutes || 0);
        const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // +2 hours

        const event = {
          summary: `${bookingData.service} - ${bookingData.name}`,
          description: `Booking Details:\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\nService: ${bookingData.service}\nNotes: ${bookingData.message || 'None'}`,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'Africa/Johannesburg',
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: 'Africa/Johannesburg',
          },
          attendees: [
            { email: bookingData.email },
          ],
        };

        await calendar.events.insert({
          calendarId: process.env.GOOGLE_CALENDAR_ID,
          requestBody: event,
          sendUpdates: 'all',
        });

        results.calendar.added = true;
      }
    } catch (error: any) {
      console.error('Google Calendar error:', error);
      results.calendar.error = error.message;
    }

    // === 4. TWILIO SMS ===
    try {
      if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        const message = `Hi ${bookingData.name}! Your booking at Re Beauty Salon for ${bookingData.service} on ${bookingData.date} at ${bookingData.time} has been received. We'll contact you within 24 hours to confirm. Thank you!`;

        await client.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: bookingData.phone,
        });

        results.sms.sent = true;
      }
    } catch (error: any) {
      console.error('Twilio error:', error);
      results.sms.error = error.message;
    }

    // Determine overall success
    const hasAnySuccess = results.email.sent || results.database.saved || results.calendar.added || results.sms.sent;

    // Always return success if at least email is attempted (even if it fails)
    // This prevents blocking users from booking when external services fail
    if (hasAnySuccess || results.email.error) {
      return res.status(200).json({
        success: true,
        message: results.email.sent 
          ? 'Booking request received successfully! We will contact you within 24 hours.'
          : 'Thank you for your booking request! We have received your information. Please call us at 076 514 0211 to confirm your appointment.',
        details: results
      });
    } else {
      // This should rarely happen - only if no services are configured
      return res.status(200).json({
        success: true,
        message: 'Thank you for your booking request! Please call us at 076 514 0211 to confirm your appointment.',
        details: results
      });
    }

  } catch (error: any) {
    console.error('Booking submission error:', error);
    return res.status(500).json({
      error: 'Failed to process booking',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Helper functions for email formatting
function formatBookingEmail(data: BookingData): string {
  return `
New Booking Request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Preferred Date: ${data.date}
Preferred Time: ${data.time}
${data.message ? `\nAdditional Notes:\n${data.message}` : ''}

---
Sent from Re Beauty Salon Website
  `.trim();
}

function formatBookingEmailHTML(data: BookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #8B4513; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Booking Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${data.name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
      </div>
      <div class="field">
        <span class="label">Phone:</span> ${data.phone}
      </div>
      <div class="field">
        <span class="label">Service:</span> ${data.service}
      </div>
      <div class="field">
        <span class="label">Preferred Date:</span> ${data.date}
      </div>
      <div class="field">
        <span class="label">Preferred Time:</span> ${data.time}
      </div>
      ${data.message ? `
      <div class="field">
        <span class="label">Additional Notes:</span><br>
        <p>${data.message}</p>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      Sent from Re Beauty Salon Website
    </div>
  </div>
</body>
</html>
  `;
}

function formatCustomerConfirmation(data: BookingData): string {
  return `
Dear ${data.name},

Thank you for your booking request at Re Beauty Salon!

Booking Details:
- Service: ${data.service}
- Preferred Date: ${data.date}
- Preferred Time: ${data.time}

We have received your request and will contact you within 24 hours to confirm your appointment.

If you have any questions, please don't hesitate to reach out.

Best regards,
Re Beauty Salon Team

---
Contact Information:
Phone: +27 12 345 6789
Email: info@resalon.co.za
Address: 123 Beauty Street, Sandton, Johannesburg
  `.trim();
}

function formatCustomerConfirmationHTML(data: BookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .booking-details { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #8B4513; }
    .footer { text-align: center; margin-top: 20px; padding: 20px; background-color: #f5f5dc; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Booking Confirmation</h2>
    </div>
    <div class="content">
      <p>Dear ${data.name},</p>
      <p>Thank you for your booking request at <strong>Re Beauty Salon</strong>!</p>
      
      <div class="booking-details">
        <h3>Your Booking Details:</h3>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Preferred Date:</strong> ${data.date}</p>
        <p><strong>Preferred Time:</strong> ${data.time}</p>
      </div>
      
      <p>We have received your request and will contact you within <strong>24 hours</strong> to confirm your appointment.</p>
      <p>If you have any questions, please don't hesitate to reach out.</p>
    </div>
    
    <div class="footer">
      <h4>Re Beauty Salon</h4>
      <p>
        📞 +27 12 345 6789<br>
        📧 info@resalon.co.za<br>
        📍 123 Beauty Street, Sandton, Johannesburg
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
