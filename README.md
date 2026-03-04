# Credits Management System - Monorepo

A full-stack application for managing credits with authentication, data visualization, and comprehensive CRUD operations. This monorepo contains both the backend API and frontend web application.

![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Express](https://img.shields.io/badge/Express-5.2.1-lightgrey)

## Table of Contents

- [Project Overview](#project-overview)
- [Monorepo Structure](#monorepo-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)

## Project Overview

This is a technical test project that implements a complete credit management system with:

- **Backend API**: RESTful API with JWT authentication, MySQL database, and email notifications
- **Frontend**: Modern React-based web application with data visualization and comprehensive UI

### Key Features

- User authentication with JWT tokens
- Credit CRUD operations (Create, Read, Update, Delete)
- Email notifications via Brevo SMTP
- Interactive dashboard with real-time statistics
- Data visualization with charts (Bar, Pie, Line)
- Responsive design for mobile and desktop
- Soft delete functionality for credits

## Monorepo Structure

```
technical-test-credits/
├── api/                    # Backend REST API
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handlers
│   ├── database/          # Models, migrations, seeders
│   ├── middlewares/       # Auth, validation, error handling
│   ├── routes/            # API routes
│   ├── services/          # Email service
│   ├── utils/             # JWT utilities
│   └── index.js           # API entry point
│
├── frontend/              # React web application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app with routes
│   │   └── main.tsx       # Entry point
│   └── public/            # Static assets
│
└── README.md              # This file
```

## Prerequisites

Before running this project, ensure you have installed:

- **Node.js** (v16 or higher)
  - Download: [https://nodejs.org/](https://nodejs.org/)
- **MySQL** (v8.0 or higher)
- **Docker & Docker Compose** (optional, for local database)
- **npm** or **yarn**

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/LuiferEduardoo/technical-test-credits.git
cd technical-test-credits
```

### 2. Backend Setup (API)

Navigate to the API directory and install dependencies:

```bash
cd api
npm install
```

Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables)).

Start the database (using Docker):

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Run migrations and seeders:

```bash
npm run migrate
npm run seed
```

Start the API server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set your API URL:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Login with default credentials (after running seeders):
   - **Email:** `luifer01ortegaperez@gmail.com`
   - **Password:** `wcNT8Q,A}N}6yWmT+Ie3`

## API Documentation

The backend is a RESTful API built with Express.js, Sequelize ORM, and MySQL.

### Features

- User authentication with JWT
- Credit management (CRUD operations)
- Email notifications via Brevo SMTP
- Password hashing with bcrypt
- Request validation with express-validator
- Error handling with @hapi/boom
- MySQL database with Sequelize ORM
- Soft deletes for credits
- Migrations and seeders

### Main Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **MySQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **nodemailer** - Email sending
- **express-validator** - Input validation

### API Endpoints

#### Authentication

- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

#### Credits (Require Authentication)

- `GET /api/credits` - Get all credits (filtered by user)
- `GET /api/credits/:id` - Get credit by ID
- `POST /api/credits` - Create new credit
- `PUT /api/credits/:id` - Update credit
- `DELETE /api/credits/:id` - Delete credit (soft delete)

#### Health Check

- `GET /health` - API health status

### Available Scripts (API)

```bash
cd api

# Start server
npm start

# Development mode
npm run dev

# Database migrations
npm run migrate
npm run migrate:undo
npm run migrate:undo:all

# Database seeders
npm run seed
npm run seed:undo
```

For detailed API documentation, see [api/README.md](./api/README.md)

## Frontend Documentation

The frontend is a modern single-page application built with React 19, TypeScript, and Vite.

### Features

- Secure JWT-based authentication
- Interactive dashboard with statistics
- Credit management with filtering and sorting
- Data visualization with Recharts
- Responsive design
- Real-time data updates
- Modern UI/UX with animations

### Main Technologies

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.3.1** - Build tool
- **React Router DOM v7** - Routing
- **Recharts** - Data visualization
- **js-cookie** - Cookie management

### Frontend Routes

- `/` - Login page
- `/dashboard` - Main dashboard layout
- `/dashboard/home` - Dashboard with statistics
- `/dashboard/credits` - Credits list and management

### Available Scripts (Frontend)

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

For detailed frontend documentation, see [frontend/README.md](./frontend/README.md)

## Technologies Used

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 16+ | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| Sequelize | 6.37.7 | ORM |
| MySQL | 8.0+ | Database |
| JWT | 9.0.3 | Authentication |
| bcrypt | 6.0.0 | Password hashing |
| nodemailer | 8.0.1 | Email service |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Vite | 7.3.1 | Build tool |
| React Router | 7.13.1 | Routing |
| Recharts | 3.7.0 | Charts |

## Environment Variables

### API (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydatabase
DB_USER=user
DB_PASSWORD=userpassword
DB_ROOT_PASSWORD=rootpassword

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Brevo SMTP Configuration
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_SECURE=false
BREVO_LOGIN=your_brevo_login
BREVO_EMAIL=your_email@example.com
BREVO_SMTP_KEY=your_brevo_smtp_key
```

### Frontend (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:3000
```

> **Note:** Never commit `.env` files to version control. Use `.env.example` as templates.

## Development Workflow

### Starting Development Environment

1. **Start MySQL database** (optional if using Docker):
   ```bash
   cd api
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Start API server**:
   ```bash
   cd api
   npm run dev
   ```

3. **Start Frontend server** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - API: http://localhost:3000
   - phpMyAdmin: http://localhost:8080 (if using Docker)

### Code Quality

- **API**: No linter configured (add ESLint if needed)
- **Frontend**: ESLint configured with React rules
  ```bash
  cd frontend
  npm run lint
  ```

### Database Management

```bash
cd api

# Create tables
npm run migrate

# Populate with sample data
npm run seed

# Reset database
npm run migrate:undo:all
npm run migrate
npm run seed
```

## Deployment

### API Deployment

1. Set production environment variables
2. Build/start the application:
   ```bash
   cd api
   npm install
   npm start
   ```

3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name credits-api
   ```

### Frontend Deployment

1. Build the application:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `./dist` folder to:
   - **Vercel**: Automatic deployment from Git
   - **Netlify**: Drag and drop `./dist` folder
   - **AWS S3**: Upload and configure as static website
   - **Nginx/Apache**: Serve as static files

3. Configure server to handle SPA routing (redirect all routes to `index.html`)

## Default User Credentials

After running the seeders in the API, you can login with:

```json
{
  "email": "luifer01ortegaperez@gmail.com",
  "password": "wcNT8Q,A}N}6yWmT+Ie3"
}
```

## Security Considerations

1. **Change JWT_SECRET** in production
2. **Use strong passwords** for database
3. **Keep .env files** private (never commit to git)
4. **Use HTTPS** in production
5. **Implement rate limiting** for production
6. **Regularly update dependencies**
7. **Enable CORS** properly for frontend domain

## Troubleshooting

### Database Connection Issues

- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists

### Email Sending Issues

- Verify Brevo SMTP credentials
- Check `BREVO_LOGIN` and `BREVO_SMTP_KEY`
- Ensure SMTP host is accessible

### Frontend API Connection Issues

- Verify API server is running
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is configured on API server
- Check browser console for detailed errors

### Port Already in Use

```bash
# Kill process on port 3000 (API)
npx kill-port 3000

# Kill process on port 5173 (Frontend)
npx kill-port 5173
```

## License

ISC

## Author

Luifer Ortega

---

**Note:** This is a technical test project. For production use, additional security measures and configurations should be implemented.

## Links

- [API Documentation](./api/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Repository](https://github.com/LuiferEduardoo/technical-test-credits)
