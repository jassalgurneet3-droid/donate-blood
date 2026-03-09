# FindBlood - Blood Donation Platform

***Note -If API not loaded, You need to create a .env file inside donate-blood repo (next to your package.json) and write: 
VITE_GEMINI_API_KEY=your API key
(create your API key from Google ai studio.
<br>
Deploy: https://donate-blood-seven.vercel.app
<br>
Ppt: https://www.canva.com/design/DAHCQBnMgCg/h81Yyxo_Cs8Q0yV2nLnkjg/view?utm_content=DAHCQBnMgCg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5638e749f6
<br>
Demo link 
<br>
https://drive.google.com/file/d/1_AZMkfJf065Wgbcaw9zRXtIAYWXKr--6/view?usp=drivesdk

<br>
Pitch link
<br>
https://drive.google.com/file/d/19wPIxhWGCii-42oCEVRidUrUdXWUhDCG/view?usp=drivesdk

A comprehensive blood donation platform built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion). This platform connects blood donors with those in need, featuring user registration, OTP verification, donor search, and blood bank locator.

## Features

- 🏠 **Home Page**: Search for blood donors by blood group and location
- 💉 **Become a Donor**: Information about blood donation benefits and eligibility
- 🩸 **Blood Compatibility**: Interactive blood type compatibility checker
- 📍 **Nearby Centres**: Find blood banks and donation centres using geolocation
- 🔐 **Authentication**: Email/Phone login with OTP verification
- 📝 **Registration**: Comprehensive signup form for donors and beneficiaries
- ✅ **Eligibility Check**: Automated donor eligibility verification
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: React 18.3.1
- **Routing**: React Router 7
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion) 12
- **Icons**: Lucide React
- **Build Tool**: Vite 6
- **Language**: TypeScript

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **pnpm** package manager

## Installation & Setup

### 1. Extract the ZIP file
Extract the downloaded ZIP file to your desired location.

### 2. Navigate to the project directory
```bash
cd find-blood-platform
```

### 3. Install dependencies
Using npm:
```bash
npm install
```

Or using pnpm (faster):
```bash
npm install -g pnpm
pnpm install
```

### 4. Start the development server
Using npm:
```bash
npm run dev
```

Or using pnpm:
```bash
pnpm dev
```

### 5. Open in browser
The application will start at `http://localhost:5173/`

Open your browser and navigate to this URL to see the application.

## Project Structure

```
find-blood-platform/
├── src/
│   ├── app/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── OTPVerification.tsx
│   │   │   └── ui/            # UI component library
│   │   ├── context/           # React Context providers
│   │   │   └── AuthContext.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── BecomeDonor.tsx
│   │   │   ├── BloodCompatibility.tsx
│   │   │   ├── NearbyCentres.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── EligibilityCheck.tsx
│   │   │   ├── Root.tsx
│   │   │   └── NotFound.tsx
│   │   ├── utils/             # Utility functions and mock data
│   │   │   └── mockData.ts
│   │   ├── App.tsx            # Main app component
│   │   └── routes.tsx         # Route configuration
│   ├── styles/                # Global styles
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── fonts.css
│   └── main.tsx              # Application entry point
├── index.html                 # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── postcss.config.mjs        # PostCSS configuration
└── README.md                 # This file
```

## Available Scripts

- `npm run dev` or `pnpm dev` - Start development server
- `npm run build` or `pnpm build` - Build for production

## Features Guide

### Home Page
- Search for donors by blood group and location
- View available donors with contact information
- Quick access to key features

### Authentication
- Register/Login with email or phone number
- 6-digit OTP verification (demo mode - any 6 digits work)
- Auto-fill contact information in signup form

### Registration
- Choose user type: Donor or Beneficiary
- Comprehensive personal information form
- GPS location access for nearby donor matching
- Donor-specific fields (tattoo status, last donation, emergency availability)
- Beneficiary-specific fields (relationship, hospital name)

### Eligibility Check
- Automated verification of donor eligibility
- Checks age, weight, tattoo status, and donation gap
- Shows next eligible donation date if not currently eligible
- Personalized recommendations

### Blood Compatibility
- Interactive blood type selector
- Shows compatible donation and receiving groups
- Complete compatibility table for all blood types
- Educational information about universal donors/receivers

### Nearby Centres
- Browser geolocation to find your location
- Distance calculation to nearby blood banks
- Contact information and working hours
- Direct navigation links to Google Maps

## Demo Credentials

For OTP verification (demo mode):
- Enter any email or phone number
- Use any 6-digit code to verify (e.g., 123456)

## Mock Data

The application uses mock data for demonstration:
- 8 sample blood donors across different cities
- 5 sample blood donation centres/hospitals
- All blood type compatibility data

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Limitations

- This is a frontend-only demo with mock data
- No actual backend API integration
- OTP verification is simulated (accepts any 6-digit code)
- No data persistence (refreshing the page clears data)
- Geolocation requires browser permission

## Future Enhancements (Backend Integration)

To make this production-ready with a Node.js backend:
- Implement REST APIs for user registration, login, and OTP verification
- Set up MongoDB database for storing user data
- Add real SMS/Email OTP service integration
- Implement donor search with database queries
- Add real-time notifications
- User authentication with JWT tokens
- Admin dashboard for managing requests

## Troubleshooting

### Port already in use
If port 5173 is already in use, Vite will automatically use the next available port.

### Dependencies not installing
Try clearing the npm cache:
```bash
npm cache clean --force
npm install
```

### Build errors
Make sure you're using Node.js version 18 or higher:
```bash
node --version
```

## License

This project is for educational and demonstration purposes.

## Support

For issues or questions, please check:
1. Make sure all dependencies are installed
2. Node.js version is 18 or higher
3. Try clearing cache and reinstalling dependencies

---

**Made with ❤️ for the blood donation community**

Donate Blood, Save Lives! 🩸
