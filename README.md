# Re Beauty Salon Website

A modern, responsive website for Re Beauty Salon built with React and TypeScript. The salon specializes in hair braiding services (box braids, cornrows, faux locs) and professional lash installations.

## 🌟 Features

- **Responsive Design**: Fully mobile-friendly with hamburger menu
- **Modern UI**: Clean, elegant design with nude color palette
- **Single Page Application**: Smooth scrolling navigation
- **Interactive Components**: Gallery with lightbox, booking form, hover effects
- **Accessible**: Semantic HTML5, ARIA labels, keyboard navigation
- **SEO Optimized**: Meta tags, semantic structure, proper headings

## 🎨 Design

- **Color Palette**: Nude tones (beige #F5F5DC, brown #8B4513, black #000000)
- **Typography**: Montserrat font family
- **Layout**: Component-based architecture with responsive grid
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd re-salon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
re-salon/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── Navbar.css
│   │   ├── Hero.css
│   │   ├── Services.css
│   │   ├── Gallery.css
│   │   ├── About.css
│   │   ├── Contact.css
│   │   └── Footer.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
└── README.md
```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Sections

1. **Navbar**: Sticky navigation with hamburger menu for mobile
2. **Hero**: Welcome section with call-to-action
3. **Services**: Service cards with pricing and duration
4. **Gallery**: Image grid with lightbox functionality
5. **About**: Salon information and mission
6. **Contact**: Booking form with salon details
7. **Footer**: Quick links, social media, and contact info

## 🎯 Services Offered

- Box Braids (R500+)
- Cornrows (R300+)
- Faux Locs (R600+)
- Lashes Installation (R400+)

## 📞 Contact Information

- **Address**: 123 Beauty Street, Sandton, Johannesburg, 2196
- **Phone**: +27 12 345 6789
- **Email**: info@resalon.co.za
- **Hours**: Mon-Fri: 9AM-7PM, Sat: 8AM-6PM, Sun: 10AM-4PM

## 🔧 Technologies Used

- **Frontend:**
  - React 19 - UI library
  - TypeScript - Type safety
  - CSS3 - Styling with custom properties
  - HTML5 - Semantic markup
  - Create React App - Build tool

- **Backend:**
  - Vercel Serverless Functions - API endpoints
  - Node.js - Runtime environment
  - Nodemailer - Email delivery
  - TypeScript - Type-safe backend

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Deployment

### Quick Deploy to Vercel

This application is **production-ready** with a fully functional backend!

**Prerequisites:**
- Node.js 16+ installed
- Email service account (Gmail or SendGrid)

**Deploy in 5 minutes:**

1. **Install dependencies:**
```bash
npm install
```

2. **Choose your email service** (pick one):
   - **Gmail** (easiest): Get app password from https://myaccount.google.com/apppasswords
   - **SendGrid** (recommended): Sign up at https://sendgrid.com/ and get API key

3. **Deploy to Vercel:**
```bash
npx vercel
```

4. **Add environment variables** in Vercel Dashboard:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SALON_EMAIL=your-email@gmail.com
```

5. **Done!** Your salon can now receive bookings online 🎉

### Detailed Guides

- **📖 [Complete Deployment Guide](DEPLOYMENT.md)** - Step-by-step instructions
- **🔑 [API Setup Guide](API_SETUP.md)** - API keys and integrations
- **📧 Email options:** Gmail, SendGrid, or custom SMTP
- **💾 Optional:** Database storage, SMS notifications, Google Calendar

### Features

✅ **Working Contact Form** - Customers can book appointments  
✅ **Email Notifications** - Both customer and salon receive emails  
✅ **Vercel Serverless Backend** - No separate server needed  
✅ **Environment Variables** - Secure API key management  
✅ **Error Handling** - Graceful error messages  
✅ **TypeScript Backend** - Type-safe API endpoints  

### Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local
# Edit .env.local with your email credentials

# Run with Vercel dev server (includes API)
npx vercel dev

# Or run React dev server only (API won't work)
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built with ❤️ for Re Beauty Salon

---

## ✨ What's New - Backend Complete!

**Your salon website now has a fully functional backend!** 

- ✅ Real booking form that sends emails
- ✅ Customer confirmation emails
- ✅ Salon notification emails
- ✅ Vercel serverless functions (no server to manage)
- ✅ Production-ready and secure
- ✅ Ready to deploy in minutes

**Next steps:**
1. Read [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
2. Check [API_SETUP.md](API_SETUP.md) for API key setup
3. Deploy to Vercel and start receiving bookings!

---