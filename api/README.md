# Technical Test - Credits API

RESTful API for credit management system built with Express.js, Sequelize, MySQL, and JWT authentication.

## Features

- 👤 User authentication with JWT
- 🏦 Credit management (CRUD operations)
- 📧 Email notifications via Brevo SMTP
- 🔒 Password hashing with bcrypt
- ✅ Data validation with express-validator
- 🛡️ Error handling with @hapi/boom
- 🗄️ MySQL database with Sequelize ORM
- 🔄 Soft deletes for credits
- 📊 Migrations and seeders

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Docker and Docker Compose (optional, for local database)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/LuiferEduardoo/technical-test-credits.git
cd technical-test-credits/api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration (see [Environment Variables](#environment-variables)).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Server Configuration
```env
PORT=3000
NODE_ENV=development
```

### Database Configuration
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mydatabase
DB_USER=user
DB_PASSWORD=userpassword
DB_ROOT_PASSWORD=rootpassword
```

### JWT Configuration
```env
JWT_SECRET=your_super_secret_key_change_this_in_production_please
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
```

### Brevo SMTP Configuration
```env
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_SECURE=false
BREVO_LOGIN=your_brevo_login
BREVO_EMAIL=your_email@example.com
BREVO_SMTP_KEY=your_brevo_smtp_key_here
```

> **Note:** Get your Brevo SMTP credentials from [Brevo.com](https://www.brevo.com) - Go to SMTP & API in your account settings.

## Database Setup

### Option 1: Using Docker Compose (Recommended)

1. Start the MySQL container:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

2. The database will be available at `localhost:3306`

3. Access phpMyAdmin at `http://localhost:8080` (optional)

### Option 2: Local MySQL

Make sure you have MySQL installed and running, then update the `.env` file with your database credentials.

## Running Migrations

Create the database tables:

```bash
npm run migrate
```

To undo the last migration:
```bash
npm run migrate:undo
```

To undo all migrations:
```bash
npm run migrate:undo:all
```

## Running Seeders

Populate the database with initial data:

```bash
npm run seed
```

This will create:
- 1 user: `luifer01ortegaperez@gmail.com` / `wcNT8Q,A}N}6yWmT+Ie3`
- 10 sample credits

## Available Scripts

```bash
# Start the server (production)
npm start

# Start the server in development mode
npm run dev

# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all

# Run seeders
npm run seed

# Undo seeders
npm run seed:undo
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "User Name",
      "email": "user@example.com"
    }
  }
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

### Credit Endpoints (Require Authentication)

All credit endpoints require a valid JWT token in the Authorization header.

#### Create Credit
```http
POST /api/credits
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "clientName": "Juan Perez",
  "identificationId": "1234567890",
  "loanAmount": 10000000,
  "interestRate": 2.0,
  "termMonths": 24
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Crédito creado exitosamente",
  "data": {
    "credit": {
      "id": 11,
      "clientName": "Juan Perez",
      "identificationId": "1234567890",
      "loanAmount": 10000000,
      "interestRate": 2.0,
      "termMonths": 24,
      "createdAt": "2025-03-03T20:30:00.000Z",
      "user": {
        "id": 1,
        "name": "User Name",
        "email": "user@example.com"
      }
    },
    "emailSent": true
  }
}
```

#### Get All Credits (Authenticated User)
```http
GET /api/credits
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "credits": [...],
    "total": 10
  }
}
```

#### Get Credit by ID
```http
GET /api/credits/:id
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Update Credit
```http
PUT /api/credits/:id
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "clientName": "Juan Perez Updated",
  "loanAmount": 15000000
}
```

#### Delete Credit (Soft Delete)
```http
DELETE /api/credits/:id
Authorization: Bearer YOUR_TOKEN_HERE
```

### Health Check
```http
GET /health
```

**Response (200):**
```json
{
  "status": "ok",
  "environment": "development",
  "database": "mydatabase"
}
```

## Project Structure

```
api/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── creditController.js  # Credits CRUD logic
├── database/
│   ├── connection.js        # Database connection
│   ├── migrations/          # Database migrations
│   ├── models/              # Sequelize models
│   │   ├── User.js
│   │   ├── Credit.js
│   │   └── index.js
│   └── seeders/             # Database seeders
├── middlewares/
│   ├── auth.js              # JWT authentication middleware
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Global error handler
│   └── validator.js         # Request validation middleware
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── creditRoutes.js      # Credit routes
├── services/
│   └── emailService.js      # Email service with Brevo SMTP
├── utils/
│   └── jwt.js               # JWT utilities
├── .env                     # Environment variables
├── .sequelizerc             # Sequelize CLI configuration
├── index.js                 # Application entry point
└── package.json
```

## Default User

After running seeders, you can login with:

```json
{
  "email": "luifer01ortegaperez@gmail.com",
  "password": "wcNT8Q,A}N}6yWmT+Ie3"
}
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **MySQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **nodemailer** - Email sending
- **express-validator** - Input validation
- **@hapi/boom** - HTTP-friendly error objects
- **dotenv** - Environment variables

## Error Handling

The API uses @hapi/boom for consistent error responses:

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error Type"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

## Security Considerations

1. **Change JWT_SECRET** in production
2. **Use strong passwords** for database
3. **Keep .env file** private (never commit to git)
4. **Use HTTPS** in production
5. **Implement rate limiting** for production
6. **Regularly update dependencies**

## Email Notifications

When a credit is created, an email is automatically sent to the authenticated user's email address with:

- Client name
- Loan amount (formatted in Colombian Pesos)
- Commercial name (authenticated user)
- Registration date

The email service uses Brevo SMTP for reliable delivery.

## Development

### Running in Development Mode
```bash
npm run dev
```

### Database Synchronization
The app automatically syncs database models on startup in development mode.

### Logging
- Email sent success: `✅ Correo enviado exitosamente: <message-id>`
- Email sent failure: `⚠️  Crédito creado pero el correo no pudo enviarse: <error>`
- Database connection: `✅ Conexión a la base de datos establecida correctamente`

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists

### Email Sending Issues
- Verify Brevo SMTP credentials
- Check `BREVO_LOGIN` and `BREVO_SMTP_KEY`
- Ensure SMTP host is accessible

### Migration Issues
- Drop and recreate database: `npm run migrate:undo:all && npm run migrate`
- Run seeders: `npm run seed`

## License

ISC

## Author

Luifer Ortega

---

**Note:** This is a technical test project. For production use, additional security measures and configurations should be implemented.
