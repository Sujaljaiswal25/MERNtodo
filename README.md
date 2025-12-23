# Todo App - MERN Stack with Authentication

A full-stack authentication-based task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

✅ **User Authentication**

- Register new users with password hashing (bcrypt)
- Login with JWT token generation
- Protected routes with JWT middleware
- Token expiration (30 days default)

✅ **Task Management**

- Create, Read, Update, Delete (CRUD) operations
- Task ownership verification
- Filter tasks by status
- Three status types: pending, in-progress, completed

✅ **Security**

- Password hashing with bcrypt (10 rounds)
- JWT authentication
- Input validation with express-validator
- Protected API routes
- User can only access their own tasks

✅ **Error Handling**

- Global error handler
- Custom validation errors
- Mongoose error handling
- JWT error handling

## Tech Stack

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS
- dotenv

## Project Structure

```
server/
├── src/
│   ├── models/
│   │   ├── User.js          # User schema with password hashing
│   │   └── Task.js          # Task schema with user reference
│   ├── controllers/
│   │   ├── authController.js # Register, login, getMe
│   │   └── taskController.js # CRUD operations for tasks
│   ├── middlewares/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── validator.js     # Input validation rules
│   ├── routes/
│   │   ├── authRoutes.js    # Auth endpoints
│   │   └── taskRoutes.js    # Task endpoints
│   ├── configs/
│   │   └── database.js      # MongoDB connection
│   └── app.js               # Express app configuration
├── server.js                # Server entry point
├── .env                     # Environment variables
├── package.json
└── API_DOCS.md             # API documentation
```

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Todo/server
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the server directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=30d
```

**Important:** Change the `JWT_SECRET` to a strong, unique secret key (minimum 32 characters).

4. **Start the server**

Development mode (with auto-restart):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks

- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks` - Get all user tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

For detailed API documentation, see [API_DOCS.md](./API_DOCS.md)

## Database Schema

### User Model

```javascript
{
  name: String (required, min 2 chars),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```javascript
{
  title: String (required),
  description: String,
  status: String (enum: pending, in-progress, completed),
  userId: ObjectId (ref: User, required),
  createdAt: Date,
  updatedAt: Date
}
```

## Testing with Postman/Thunder Client

1. **Register a user**

   - POST `http://localhost:3000/api/auth/register`
   - Body: `{ "name": "Test User", "email": "test@example.com", "password": "test123" }`

2. **Login**

   - POST `http://localhost:3000/api/auth/login`
   - Body: `{ "email": "test@example.com", "password": "test123" }`
   - Copy the token from response

3. **Create a task** (protected)

   - POST `http://localhost:3000/api/tasks`
   - Headers: `Authorization: Bearer {your_token}`
   - Body: `{ "title": "My Task", "description": "Task description", "status": "pending" }`

4. **Get all tasks**
   - GET `http://localhost:3000/api/tasks`
   - Headers: `Authorization: Bearer {your_token}`

## Security Best Practices

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens expire after 30 days (configurable)
- User passwords are never returned in API responses
- All task operations verify user ownership
- Input validation on all endpoints
- Environment variables for sensitive data

## Error Handling

The API provides consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized / Invalid Token
- `403` - Forbidden / Not Authorized
- `404` - Not Found
- `500` - Server Error

## Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Refresh token mechanism
- [ ] Task due dates and priorities
- [ ] Task categories/tags
- [ ] Pagination for task lists
- [ ] Search functionality
- [ ] Rate limiting
- [ ] Helmet.js for security headers
- [ ] Task sharing between users

## Development

**Dependencies installed:**

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "express-validator": "^7.0.1",
  "cors": "^2.8.5",
  "cookie-parser": "^1.4.7",
  "dotenv": "^17.2.3"
}
```

## License

ISC

## Author

Your Name

---

**Note:** This is a demonstration project showcasing MERN stack development skills, authentication patterns, and RESTful API design.
