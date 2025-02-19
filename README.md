# Secure Notes Application

A secure note-taking application built with Node.js, Next.js, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Running the Application

1. Clone the repository:

bash
git clone <repository-url>
cd secure-notes-app


2. Create a `.env` file in the root directory:

bash
cp .env.example .env


3. Start the application using Docker Compose:

bash
docker-compose up -d


The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

### Development Setup

If you want to run the application locally without Docker:

1. Backend Setup:
   
bash
cd backend
cp .env.example .env  # Configure your environment variables
npm install
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run database migrations
npm run dev  # Starts backend on http://localhost:3001


2. Frontend Setup:

bash
cd frontend
cp .env.example .env  # Configure your environment variables
npm install
npm run dev  # Starts frontend on http://localhost:3000

Note: Make sure you have a local PostgreSQL instance running and update the DATABASE_URL in backend/.env accordingly.



## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Notes Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## 🔒 Security Features

- JWT-based authentication with HttpOnly cookies
- Password hashing using bcrypt
- XSS protection
- CSRF protection
- SQL injection prevention using Prisma ORM
- Rate limiting
- Secure headers with Helmet

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- TypeScript

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

## 📦 Docker Commands

### Build and Start

bash

Build and start all services

    docker-compose up -d --build

View logs

    docker-compose logs -f

Stop all services

    docker-compose down

Stop and remove volumes

    docker-compose down -v

Restart specific service

    docker-compose restart backend

View service logs
    
    docker-compose logs frontend

Execute commands in container

    docker-compose exec backend sh
    docker-compose exec frontend sh

## 🔧 Troubleshooting

1. If the database connection fails:
   - Ensure PostgreSQL container is running: `docker-compose ps`
   - Check database logs: `docker-compose logs postgres`

2. If the frontend can't connect to the backend:
   - Verify both services are running: `docker-compose ps`
   - Check backend logs: `docker-compose logs backend`
   - Ensure NEXT_PUBLIC_API_URL is correctly set

3. For permission issues:
   - Ensure proper file permissions: `chmod -R 777 postgres_data`

## 🔐 Production Deployment

For production deployment:

1. Update environment variables with secure values
2. Enable HTTPS/SSL
3. Set appropriate CORS settings
4. Use a production-grade PostgreSQL setup
5. Implement proper logging and monitoring
6. Set up regular backups

## 📄 License

[MIT License](LICENSE)


# **📌 Test Job Specification: Secure Notes To-Do App**  

## **1️⃣ Overview**  
Develop a **secure Notes To-Do application** consisting of a **Node.js backend** (Express, Prisma, PostgreSQL) and a **Next.js frontend**. The application should support **user authentication**, **secure API communication**, and **CRUD operations for notes**, while following **best security practices** (protection against SQL Injection, XSS, CSRF, Clickjacking, and secure authentication).  

---

## **2️⃣ Functional Requirements**  

### **👤 User Authentication**  
✅ **Register** → A new user can sign up using **email and password**.  
✅ **Login** → Users can log in using **JWT-based authentication (stored in HttpOnly cookies)**.  
✅ **Logout** → Users can log out, which removes the authentication token.  
✅ **User Profile** → Users can fetch their profile details.  

---

### **📝 Notes Management**  
✅ **Create Notes** → Users can create a new note by providing a **title** and **content**.  
✅ **View Notes** → Users can view a list of all their saved notes.  
✅ **Edit Notes** → Users can update their own notes.  
✅ **Delete Notes** → Users can delete a note.  

---

### **🔐 Security Requirements**  
✅ **Prevent SQL Injection** → Use Prisma ORM instead of raw SQL queries.  
✅ **Prevent XSS (Cross-Site Scripting)** → Sanitize user inputs and stored data.  
✅ **Prevent CSRF (Cross-Site Request Forgery)** → Implement CSRF protection.  
✅ **Prevent Clickjacking** → Use HTTP security headers (`X-Frame-Options`, `Content-Security-Policy`).  
✅ **JWT Authentication** → Secure session management using HttpOnly cookies.  
✅ **Rate Limiting** → Limit login attempts and API requests to prevent brute-force attacks.  

---

## **3️⃣ User Roles & Permissions**  

| **Role** | **Permissions** |
|----------|---------------|
| **Authenticated User** | Register, Login, Logout, View Profile, Manage (Create, View, Edit, Delete) Own Notes |
| **Guest (Unauthenticated User)** | Register, Login |

---

## **4️⃣ API Endpoints & Expected Behavior**  

| **Method** | **Endpoint** | **Description** | **Auth Required?** |
|------------|-------------|-----------------|-------------------|
| `POST` | `/register` | Register new user | No |
| `POST` | `/login` | Login user (JWT-based) | No |
| `POST` | `/logout` | Logout user | Yes |
| `GET` | `/profile` | Fetch user profile | Yes |
| `POST` | `/notes` | Create a new note | Yes |
| `GET` | `/notes` | Fetch all notes (only user's own notes) | Yes |
| `PUT` | `/notes/:id` | Update a note (only user's own note) | Yes |
| `DELETE` | `/notes/:id` | Delete a note (only user's own note) | Yes |

---

## **5️⃣ Application Flow**  

### **User Registration & Login Flow**  
1. **User visits the sign-up page.**  
2. **User enters an email and password.**  
3. **Backend hashes the password and stores the user data in the database.**  
4. **User logs in using credentials.**  
5. **JWT token is created and stored as an HttpOnly cookie.**  
6. **Authenticated user is redirected to the notes dashboard.**  

---

### **Notes Management Flow**  
1. **User logs in and navigates to the dashboard.**  
2. **User can create a new note by entering a title and content.**  
3. **User sees a list of their own notes.**  
4. **User can edit or delete their own notes.**  
5. **Changes are saved in the database and updated in real-time.**  

---

## **6️⃣ Frontend Requirements**  

### **📌 Tech Stack**  
- **Next.js** (Frontend framework)  
- **React.js** (Component-based UI)  
- **Axios** (API communication)  
- **Tailwind CSS** (Styling)  
- **js-cookie** (Handling authentication cookies)  

### **📌 UI Pages & Features**  
✅ **Login Page** → User authentication form.  
✅ **Register Page** → Sign-up form for new users.  
✅ **Dashboard Page** → Displays the list of notes.  
✅ **Note Editor Page** → Allows users to create/edit notes.  
✅ **Profile Page** → Displays user profile details.  
✅ **Logout Button** → Clears session and redirects to login page.  

---

## **7️⃣ Backend Requirements**  

### **📌 Tech Stack**  
- **Node.js** (Backend runtime)  
- **Express.js** (API framework)  
- **Prisma ORM** (Database interactions)  
- **PostgreSQL** (Database)  
- **Helmet** (Security headers)  
- **Csurf** (CSRF protection)  
- **Express Validator** (Input validation)  
- **Sanitize-html** (Prevents XSS)  
- **JWT (jsonwebtoken)** (Authentication)  
- **Bcrypt.js** (Password hashing)  

---

## **8️⃣ Performance & Scalability Considerations**  
✅ **Efficient Database Queries** → Prisma ORM optimizations.  
✅ **Pagination** → Limit the number of notes per request.  
✅ **Caching** → Potential use of Redis for session storage (optional).  
✅ **Logging & Monitoring** → Use structured logs for debugging.  





