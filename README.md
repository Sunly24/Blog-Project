# 📝 Microservices Blogging Platform

A modern blogging platform built with **Microservices Architecture** featuring Authentication, Content Management, Comments, and API Gateway.

## 🚀 Services

| Service             | Technology      | Port | Database |
| ------------------- | --------------- | ---- | -------- |
| **API Gateway**     | Node.js/Express | 8080 | -        |
| **Auth Service**    | Laravel/PHP     | 8000 | MySQL    |
| **Content Service** | Node.js/Express | 3000 | MongoDB  |
| **Comment Service** | Node.js/Express | 4000 | MongoDB  |

## 📋 Prerequisites

Before running the platform, ensure you have:

- **Docker** (v20.10+)
- **Docker Compose** (v2.0+)
- **Git**

Optional for local development:

- Node.js (v20+)
- PHP (v8.2+)
- Composer
- npm/yarn

## 🎯 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Sunly24/Blog-Project.git
cd Blog-Project
```

### 2. Start All Services with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

### 3. Verify Services are Running

```bash
# Check all containers
docker-compose ps

# Check logs
docker-compose logs -f

# Check specific service logs
docker-compose logs -f api-gateway
docker-compose logs -f auth-user-service
docker-compose logs -f content-service
docker-compose logs -f comment-service
```

### 4. Access the Services

- **API Gateway**: http://localhost:8080
- **Auth Service**: http://localhost:8000
- **Content Service**: http://localhost:3000
- **Comment Service**: http://localhost:4000
- **MySQL**: localhost:3306
- **MongoDB**: localhost:27017

### 5. Health Check

```bash
# Check API Gateway health
curl http://localhost:8080/health
```

## 🛠️ API Endpoints

All requests go through the **API Gateway** at `http://localhost:8080`

### 🔐 Authentication (Auth Service)

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/api/auth/register` | Register new user | ❌            |
| POST   | `/api/auth/login`    | User login        | ❌            |
| POST   | `/api/auth/logout`   | User logout       | ✅            |

**Example - Register:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

**Example - Login:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 📄 Content Management (Content Service)

| Method | Endpoint                      | Description     | Auth Required |
| ------ | ----------------------------- | --------------- | ------------- |
| POST   | `/api/content/create`         | Create new post | ✅            |
| GET    | `/api/content/getAllContent`  | Get all posts   | ❌            |
| GET    | `/api/content/getContent/:id` | Get single post | ❌            |
| PUT    | `/api/content/update/:id`     | Update post     | ✅            |
| DELETE | `/api/content/delete/:id`     | Delete post     | ✅            |

**Example - Create Content:**

```bash
curl -X POST http://localhost:8080/api/content/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my blog post",
    "author": "John Doe"
  }'
```

**Example - Get All Content:**

```bash
curl http://localhost:8080/api/content/getAllContent
```

### 💬 Comments (Comment Service)

| Method | Endpoint                          | Description             | Auth Required |
| ------ | --------------------------------- | ----------------------- | ------------- |
| POST   | `/api/comment/create`             | Create comment          | ✅            |
| GET    | `/api/comment/content/:contentId` | Get comments by content | ❌            |
| DELETE | `/api/comment/delete/:id`         | Delete comment          | ✅            |

**Example - Create Comment:**

```bash
curl -X POST http://localhost:8080/api/comment/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "contentId": "67a1234567890abcdef12345",
    "userId": "user123",
    "commentText": "Great post!"
  }'
```

**Example - Get Comments for Content:**

```bash
curl http://localhost:8080/api/comment/content/67a1234567890abcdef12345
```

## 🔑 Authentication

Protected endpoints require a JWT token in the Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

Get your token by logging in via `/api/auth/login`

## 🛑 Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database data)
docker-compose down -v
```

## 🔧 Development Mode

### Run Individual Services Locally

**1. Auth Service (Laravel)**

```bash
cd auth-user-service
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8000
```

**2. Content Service (Node.js)**

```bash
cd content-service
npm install
# Create .env file with MONGO_URL and PORT
npm run dev
```

**3. Comment Service (Node.js)**

```bash
cd comment-service
npm install
# Create .env file with MONGO_URL and PORT
npm run dev
```

**4. API Gateway (Node.js)**

```bash
cd api-gateway
npm install
# Create .env file with service URLs
npm run dev
```

## 📦 Project Structure

```
Blog-Project/
├── api-gateway/          # API Gateway service
│   ├── src/
│   │   ├── routes/       # Route handlers
│   │   ├── middleware/   # Auth middleware
│   │   └── utils/        # Service proxy
│   ├── dockerfile
│   └── package.json
├── auth-user-service/    # Laravel Auth service
│   ├── app/
│   ├── config/
│   ├── routes/
│   ├── dockerfile
│   └── composer.json
├── content-service/      # Express Content service
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── dockerfile
│   └── package.json
├── comment-service/      # Express Comment service
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── dockerfile
│   └── package.json
└── docker-compose.yml    # Multi-container orchestration
```

## 🐛 Troubleshooting

### Services Not Starting

```bash
# Check container status
docker-compose ps

# View logs for specific service
docker-compose logs auth-user-service
docker-compose logs content-service
docker-compose logs comment-service
```

### Port Already in Use

```bash
# Stop all containers
docker-compose down

# Check what's using the port
lsof -i :8080
lsof -i :3000
lsof -i :4000

# Kill the process or change ports in docker-compose.yml
```

### Database Connection Issues

```bash
# Restart databases
docker-compose restart mysql mongo

# Check database logs
docker-compose logs mysql
docker-compose logs mongo
```

### Clear Everything and Start Fresh

```bash
# Remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Rebuild from scratch
docker-compose up --build
```

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Rate Limiting (100 requests/15 minutes)
- ✅ CORS Protection
- ✅ Input Validation
- ✅ Service Isolation

## 📊 Database Schema

### MySQL (Auth Service)

- **users** table: id, name, email, password, created_at, updated_at

### MongoDB (Content Service)

- **contents** collection: \_id, title, content, author, createdAt, updatedAt

### MongoDB (Comment Service)

- **comments** collection: \_id, contentId, userId, commentText, createdAt

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Sunly24** - [GitHub](https://github.com/Sunly24)

## 🙏 Acknowledgments

- Built with Docker & Docker Compose
- Laravel Framework
- Express.js Framework
- MongoDB & MySQL
