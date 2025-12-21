# Blog Project API Endpoints

All requests go through the API Gateway at `http://localhost:8080`

## Authentication Service

### POST `/api/auth/register`

Register a new user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### POST `/api/auth/login`

Login user

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes token for authenticated requests.

### POST `/api/auth/logout`

Logout user (requires authentication)

- Header: `Authorization: Bearer {token}`

---

## Content Service

### POST `/api/content/create`

Create new content (requires authentication)

- Header: `Authorization: Bearer {token}`

```json
{
  "title": "My Blog Post",
  "content": "This is the content...",
  "author": "John Doe"
}
```

### GET `/api/content/getAllContent`

Get all content (public)

### GET `/api/content/getContent/:id`

Get single content by ID (public)

### PUT `/api/content/update/:id`

Update content (requires authentication)

- Header: `Authorization: Bearer {token}`

```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

### DELETE `/api/content/delete/:id`

Delete content (requires authentication)

- Header: `Authorization: Bearer {token}`

---

## Comment Service

### POST `/api/comment/create`

Create new comment (requires authentication)

- Header: `Authorization: Bearer {token}`

```json
{
  "contentId": "60a7c8d4f3b3c8001c8e4b1a",
  "userId": "user123",
  "commentText": "Great post!"
}
```

### GET `/api/comment/content/:contentId`

Get all comments for a specific content (public)

### DELETE `/api/comment/delete/:id`

Delete comment (requires authentication)

- Header: `Authorization: Bearer {token}`

---

## Service Architecture

```
API Gateway (Port 8080)
├── Auth Service (Port 8000) - Laravel + MySQL
├── Content Service (Port 3000) - Express + MongoDB
└── Comment Service (Port 4000) - Express + MongoDB
```

## Authentication Flow

1. Register/Login to get a token
2. Include token in Authorization header for protected endpoints
3. Format: `Authorization: Bearer {token}`

## Running the Services

### Using Docker Compose

```bash
docker compose up --build
```

### Running Locally

```bash
# Terminal 1 - Auth Service
cd auth-user-service
php artisan serve

# Terminal 2 - Content Service
cd content-service
npm start

# Terminal 3 - Comment Service
cd comment-service
npm start

# Terminal 4 - API Gateway
cd api-gateway
npm start
```
