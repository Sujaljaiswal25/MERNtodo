# API Documentation - Todo App

## Base URL

```
http://localhost:3000/api
```

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login

**POST** `/auth/login`

Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get Current User

**GET** `/auth/me`

Headers:

```
Authorization: Bearer {token}
```

Response:

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-12-22T00:00:00.000Z"
  }
}
```

## Task Endpoints (All Protected)

### Create Task

**POST** `/tasks`

Headers:

```
Authorization: Bearer {token}
```

Request Body:

```json
{
  "title": "Complete project",
  "description": "Finish the todo app",
  "status": "pending"
}
```

Response:

```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the todo app",
    "status": "pending",
    "userId": "user_id",
    "createdAt": "2025-12-22T00:00:00.000Z",
    "updatedAt": "2025-12-22T00:00:00.000Z"
  }
}
```

### Get All Tasks

**GET** `/tasks`

Query Parameters (optional):

- `status`: Filter by status (pending, in-progress, completed)

Headers:

```
Authorization: Bearer {token}
```

Response:

```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete project",
      "description": "Finish the todo app",
      "status": "in-progress",
      "userId": "user_id",
      "createdAt": "2025-12-22T00:00:00.000Z",
      "updatedAt": "2025-12-22T00:00:00.000Z"
    }
  ]
}
```

### Get Single Task

**GET** `/tasks/:id`

Headers:

```
Authorization: Bearer {token}
```

Response:

```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Complete project",
    "description": "Finish the todo app",
    "status": "pending",
    "userId": "user_id",
    "createdAt": "2025-12-22T00:00:00.000Z",
    "updatedAt": "2025-12-22T00:00:00.000Z"
  }
}
```

### Update Task

**PUT** `/tasks/:id`

Headers:

```
Authorization: Bearer {token}
```

Request Body:

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

Response:

```json
{
  "success": true,
  "task": {
    "_id": "task_id",
    "title": "Updated title",
    "description": "Updated description",
    "status": "completed",
    "userId": "user_id",
    "createdAt": "2025-12-22T00:00:00.000Z",
    "updatedAt": "2025-12-22T00:00:00.000Z"
  }
}
```

### Delete Task

**DELETE** `/tasks/:id`

Headers:

```
Authorization: Bearer {token}
```

Response:

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Status Values

- `pending`: Task not started
- `in-progress`: Task currently being worked on
- `completed`: Task finished

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Validation Error",
  "details": ["Email is required", "Password must be at least 6 characters"]
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": "Not authorized, no token provided"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": "Not authorized to access this task"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Task not found"
}
```

### 500 Server Error

```json
{
  "success": false,
  "error": "Something went wrong!"
}
```
