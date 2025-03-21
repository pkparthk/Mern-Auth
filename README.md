# MERN Authentication Application

A complete MERN (MongoDB, Express, React, Node.js) stack application featuring JWT authentication, SSL implementation, and role-based access control (admin and developer roles).

## Features

- User registration and login with JWT authentication
- Role-based authorization (Admin and Developer roles)
- Secure routes with middleware protection
- SSL implementation for secure communication
- Password encryption using bcrypt
- MongoDB database for data storage
- React frontend with context API for state management
- Responsive UI for various screen sizes

## Project Structure

```
mern-auth-app/
├── client/                           # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.js
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   └── DeveloperDashboard.js
│   │   │   ├── layout/
│   │   │   │   └── NotFound.js
│   │   │   └── routing/
│   │   │       └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                           # Node.js backend
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── ssl/                              # SSL certificates
│   ├── cert.pem
│   ├── csr.pem
│   └── key.pem
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-auth-app.git
cd mern-auth-app
```

### 2. Set up environment variables

Create a `.env` file in the server directory:

```bash
cd server
touch .env
```

Add the following environment variables to the `.env` file:

```
PORT=5000
HTTPS_PORT=5001
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

Replace `your_jwt_secret_key_here` with a strong secret key.

### 3. Generate SSL certificates

For development, generate self-signed SSL certificates:

```bash
mkdir -p ssl
cd ssl

# Generate private key
openssl genrsa -out key.pem 2048

# Generate certificate signing request
openssl req -new -key key.pem -out csr.pem

# Generate self-signed certificate (valid for 365 days)
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

# Return to project root
cd ..
```

For production, use certificates from a trusted Certificate Authority like Let's Encrypt.

### 4. Install server dependencies

```bash
cd server
npm install
```

### 5. Install client dependencies

```bash
cd ../client
npm install
```

### 6. Run the application

#### Development mode

From the root directory:

```bash
# Start MongoDB (if running locally)
mongod

# Start both frontend and backend (from server directory)
cd server
npm run dev
```

Or start separately:

```bash
# Terminal 1 - Start backend
cd server
npm run server

# Terminal 2 - Start frontend
cd client
npm start
```

#### Production mode

For production, build the React frontend:

```bash
cd client
npm run build
```

Then start the server:

```bash
cd ../server
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Users

- `GET /api/users/me` - Get current user (requires authentication)
- `GET /api/users` - Get all users (requires admin role)

## User Roles

### Admin
- Access to admin dashboard
- Can view all users in the system
- Has access to system configuration options

### Developer
- Access to developer dashboard
- Restricted to developer-specific features

## Security Features

1. **JWT Authentication**: Secures API routes and authenticates users
2. **Password Hashing**: Uses bcrypt to hash passwords before storage
3. **SSL/HTTPS**: Encrypts data transmission between client and server
4. **Role-Based Authorization**: Controls access based on user roles
5. **Protected Routes**: Middleware to verify JWT tokens
6. **HTTP Security Headers**: Uses Helmet middleware to set security headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.