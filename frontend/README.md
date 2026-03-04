# Credits Management System - Frontend

A modern, full-featured web application for managing credits with authentication, data visualization, and comprehensive CRUD operations.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)
![Recharts](https://img.shields.io/badge/Recharts-2.x-green)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Features Overview](#-features-overview)
- [API Integration](#-api-integration)
- [Environment Variables](#-environment-variables)
- [Building for Production](#-building-for-production)
- [Contributing](#-contributing)

## ✨ Features

- **🔐 Secure Authentication**
  - JWT-based authentication with token storage in HTTP-only cookies
  - Protected routes with automatic redirection
  - Login form with email validation and error handling

- **📊 Interactive Dashboard**
  - Real-time credit statistics and metrics
  - Multiple chart visualizations (Bar, Pie, Line charts)
  - Responsive design with sidebar navigation
  - Summary cards with key performance indicators

- **💳 Credit Management**
  - Create new credits with comprehensive validation
  - List all credits with filtering and sorting capabilities
  - Search by client name, ID, or commercial agent
  - Sort by date or credit amount (ascending/descending)
  - Detailed credit table with all relevant information

- **📈 Data Visualization**
  - Loan amounts by client (Bar Chart)
  - Term distribution (Pie Chart)
  - Interest rate trends (Line Chart)
  - Real-time data updates

- **🎨 Modern UI/UX**
  - Clean, professional design with gradient backgrounds
  - Responsive layout for desktop and mobile
  - Loading states and error handling
  - Smooth animations and transitions

## 🛠 Tech Stack

- **Framework:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 7.3.1
- **Routing:** React Router DOM v7
- **Charts:** Recharts 2.x
- **HTTP Client:** Native Fetch API
- **Cookie Management:** js-cookie
- **Styling:** Pure CSS with modern features

## 📦 Prerequisites

Before running this project, ensure you have installed:

- **Node.js** (v20.19.0 or v22.13.0 or higher)
  - Check version: `node --version`
  - Download: [https://nodejs.org/](https://nodejs.org/)

- **npm** (comes with Node.js)
  - Check version: `npm --version`

- **API Server** running on configured port
  - Default: `http://localhost:3000`

## 🚀 Installation

1. **Clone the repository** (if not already cloned):
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React and React DOM
   - TypeScript
   - React Router
   - Recharts
   - js-cookie
   - Vite and plugins

## ⚙️ Configuration

1. **Create environment file**:

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Configure API URL**:

   Edit `.env` file and set your API URL:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

   Replace `http://localhost:3000` with your actual API server URL.

3. **Environment Variables**:

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `VITE_API_URL` | Base URL for API requests | `http://localhost:3000` |

## 🏃 Running the Project

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- **URL:** [http://localhost:5173](http://localhost:5173)
- **Network:** Use the provided network URL for testing on other devices

**Features in development mode:**
- ⚡ Instant hot module replacement (HMR)
- 🐛 Source map debugging
- 🔍 Detailed error messages

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Bundle and minify the code
- Optimize assets
- Output to `./dist` directory

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

This serves the production build at [http://localhost:4173](http://localhost:4173)

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Credits.tsx          # Credits list with charts
│   │   ├── Credits.css          # Styles for credits page
│   │   ├── CreateCredit.tsx     # Create credit form
│   │   ├── CreateCredit.css     # Styles for create form
│   │   ├── Dashboard.tsx        # Main dashboard layout
│   │   ├── Dashboard.css        # Dashboard styles (deprecated)
│   │   ├── Home.tsx             # Home page with statistics
│   │   ├── Home.css             # Home page styles
│   │   ├── LoginForm.tsx        # Login form
│   │   ├── LoginForm.css        # Login form styles
│   │   ├── ProtectedRoute.tsx   # Route protection wrapper
│   │   └── Sidebar.tsx          # Navigation sidebar
│   ├── utils/              # Utility functions
│   │   └── auth.ts              # Authentication utilities
│   ├── App.tsx             # Main app component with routes
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite environment types
├── .env                   # Environment variables (gitignored)
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node-specific TypeScript config
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🎮 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `tsc -b && vite build` | Build for production |
| `lint` | `eslint .` | Run ESLint |
| `preview` | `vite preview` | Preview production build |

## 🌟 Features Overview

### 1. Authentication System

**Login Flow:**
- Navigate to `/` (home page)
- Enter email and password
- System validates email format and password length
- On success, JWT token is stored in cookies
- Automatic redirect to dashboard

**Protected Routes:**
- All dashboard routes require authentication
- Automatic redirect to login if not authenticated
- Token sent with every API request

### 2. Dashboard Home

**Statistics Display:**
- Total number of credits
- Total loan amount
- Average interest rate
- Average term in months

**Information Cards:**
- System overview
- Data analysis capabilities
- Navigation hints

### 3. Credits Management

**List View:**
- **Filtering:** Real-time search by:
  - Client name
  - Identification ID
  - Commercial agent name

- **Sorting:**
  - By creation date (ascending/descending)
  - By loan amount (ascending/descending)
  - Visual indicators for active sort

- **Table Columns:**
  - Client name
  - Identification ID
  - Commercial agent
  - Loan amount (formatted as COP)
  - Interest rate
  - Term in months
  - Creation date

**Create Credit:**
- Click "➕ New Credit" button
- Fill in the form with:
  - Client name (min 3 characters)
  - Identification ID (6-15 digits)
  - Loan amount (min $100,000)
  - Interest rate (1-100%)
  - Term (1-120 months)
- System validates all inputs
- On success, shows confirmation and reloads list

### 4. Data Visualization

**Charts Available:**
1. **Bar Chart:** Loan amounts by client
2. **Pie Chart:** Distribution of loan terms
3. **Line Chart:** Interest rates across clients

All charts are:
- 📱 Responsive
- 🎨 Custom styled
- 🔄 Real-time updated
- 🖱️ Interactive with tooltips

## 🔌 API Integration

### Authentication Endpoints

**Login:**
```typescript
POST /api/auth/login

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt-token-here"
  }
}
```

### Credits Endpoints

**Get All Credits:**
```typescript
GET /api/credits

Headers:
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}

Response:
{
  "success": true,
  "data": {
    "credits": [...],
    "total": 10
  }
}
```

**Create Credit:**
```typescript
POST /api/credits

Headers:
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}

Request:
{
  "clientName": "Pedro",
  "identificationId": "203445",
  "loanAmount": 12500000.00,
  "interestRate": 10,
  "termMonths": 28
}

Response:
{
  "success": true,
  "message": "Crédito creado exitosamente",
  "data": {
    "credit": {...},
    "emailSent": true
  }
}
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
```

**Important:**
- Never commit `.env` to version control
- Use `.env.example` as template
- Variables must start with `VITE_` to be accessible in the code
- Restart dev server after changing `.env`

## 📦 Building for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Output location:**
   - Built files will be in `./dist` directory

3. **Deploy:**
   - Upload contents of `./dist` to your web server
   - Configure server to handle SPA routing (redirect all routes to `index.html`)

4. **Common deployment platforms:**
   - **Vercel:** Automatic deployment from Git
   - **Netlify:** Drag and drop `./dist` folder
   - **AWS S3:** Upload and configure as static website
   - **Nginx/Apache:** Serve as static files

## 🧪 Development Tips

### Hot Module Replacement (HMR)
- Changes to components reflect instantly without page reload
- State is preserved during HMR

### TypeScript Benefits
- Type safety at compile time
- Better IDE autocomplete
- Reduced runtime errors

### Browser DevTools
- React DevTools for component inspection
- Network tab to monitor API calls
- Console for debugging

## 🐛 Troubleshooting

### Common Issues

**1. Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

**2. Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript errors:**
```bash
# Restart TypeScript server in VS Code
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

**4. API connection failed:**
- Verify API server is running
- Check `VITE_API_URL` in `.env`
- Ensure CORS is configured on API server
- Check browser console for detailed errors

## 📝 License

This project is proprietary software. All rights reserved.

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using React + TypeScript + Vite**
