# Student Management System

A full-stack Student Management System built with **React, Node.js, Express, MongoDB, and JWT Authentication**.

The application allows an academy/admin to manage students, attendance, reports, and settings through a professional responsive dashboard.

---

## 📌 Project Overview

The Student Management System is a full-stack web application developed as a React learning and final project.

The project demonstrates how a modern frontend communicates with a backend API, how data is stored in MongoDB, and how authentication is handled using JWT and password hashing.

### Main Application Flow

```text
Browser
   ↓
React Frontend
   ↓
REST API
   ↓
Express / Node.js Backend
   ↓
MongoDB Database
   ↓
Express Response
   ↓
React Frontend
   ↓
Browser
```

---

## ✨ Features

### 🔐 Authentication

* Admin/student login
* JWT-based authentication
* Password hashing with bcryptjs
* Protected dashboard route
* Logout functionality
* Token stored in browser LocalStorage
* Unauthorized users are redirected to the login page

### 👨‍🎓 Student Management

* View students
* Add new students
* Edit student information
* Delete students
* Search students
* Filter students by class
* View individual student details

### 📅 Attendance Management

* Mark students as Present
* Mark students as Absent
* Reset attendance
* Attendance statistics
* Attendance percentage
* Attendance data stored in LocalStorage

### 📊 Reports

* Total students
* Present students
* Absent students
* Attendance percentage
* Student attendance status

### ⚙️ Settings

* Update academy name
* Update admin name
* Save settings using LocalStorage
* Settings preview

### 🎨 UI / UX

* Professional dashboard
* Responsive layout
* Mobile-friendly sidebar
* Responsive student cards
* Responsive forms
* Responsive attendance and reports pages
* Consistent warm/elegant theme
* Hover effects and transitions

---

## 🛠️ Technologies Used

### Frontend

* React 19
* React DOM
* React Router DOM
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT
* bcryptjs
* Protected routes
* Environment variables

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* Render

---

## 📂 Project Structure

```text
student-list-manager/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── studentValidator.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Student.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   └── teacherRoutes.js
│   │
│   ├── services/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── src/
│   │
│   ├── services/
│   │   └── studentApi.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── Login.jsx
│   ├── Login.css
│   ├── Dashboard.jsx
│   ├── Students.jsx
│   ├── StudentCard.jsx
│   ├── StudentForm.jsx
│   ├── EditStudentForm.jsx
│   ├── StudentDetails.jsx
│   ├── Attendance.jsx
│   ├── Reports.jsx
│   ├── Settings.jsx
│   ├── Home.jsx
│   ├── About.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔑 Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

### Login Process

```text
User enters email and password
            ↓
React sends POST request
            ↓
Express receives login request
            ↓
User is searched in MongoDB
            ↓
Password is checked using bcrypt
            ↓
JWT token is generated
            ↓
Token is returned to React
            ↓
React stores token in LocalStorage
            ↓
User is redirected to Dashboard
```

### Password Security

Passwords are not stored as plain text.

During registration, passwords are hashed using:

```js
bcrypt.hash(password, 10)
```

During login, the entered password is compared with the stored hash.

---

## 🔒 Protected Routes

The dashboard is protected using a React route check.

If a token does not exist:

```text
User → /dashboard
       ↓
Token exists?
       ↓
     No
       ↓
Redirect → /login
```

After logout, the JWT token is removed from LocalStorage.

---

## 👨‍🎓 Student CRUD Operations

The application implements the complete CRUD system.

### Create

Add a new student using:

```text
POST /api/students
```

### Read

Get students using:

```text
GET /api/students
```

### Update

Update a student using:

```text
PUT /api/students/:id
```

### Delete

Delete a student using:

```text
DELETE /api/students/:id
```

---

## 🌐 API

The backend runs locally on:

```text
http://localhost:5000
```

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Students

```text
GET    /api/students
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
```

Other backend routes are also organized for modules such as courses and teachers.

---

## 🗄️ MongoDB

MongoDB is used as the main database.

Mongoose is used to create models and communicate with MongoDB.

### Student Data Example

```text
Student
├── name
├── age
├── className
└── _id
```

### User Data Example

```text
User
├── name
├── email
├── password
├── role
└── timestamps
```

The user role can be:

```text
admin
student
```

---

## 🔄 Data Flow

One of the main concepts demonstrated by this project is full-stack data flow.

For example, when an admin adds a student:

```text
1. User fills the React form
          ↓
2. React receives the form data
          ↓
3. React sends POST request
          ↓
4. Express receives the request
          ↓
5. Validator checks the data
          ↓
6. Controller/route processes the request
          ↓
7. Mongoose saves the student
          ↓
8. MongoDB stores the data
          ↓
9. Express sends response
          ↓
10. React updates the UI
          ↓
11. User sees the new student
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd student-list-manager
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Install backend dependencies

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Do not upload the real `.env` file to GitHub.

The project uses `.gitignore` to keep sensitive environment variables private.

---

## ▶️ Running the Application

### Start Backend

Open a terminal:

```bash
cd backend
npm start
```

The backend should run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal in the project root:

```bash
npm run dev
```

Vite will provide the local frontend URL.

Open that URL in your browser.

---

## 🧪 Testing

The backend API can be tested using tools such as Postman.

Examples:

```text
POST /api/auth/login
GET /api/students
POST /api/students
PUT /api/students/:id
DELETE /api/students/:id
```

Authentication requests return a JWT token after successful login.

---

## 📱 Responsive Design

The application is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile phones

The responsive UI includes:

* Collapsed mobile sidebar
* Mobile navigation icons
* Responsive forms
* Responsive student cards
* Responsive attendance buttons
* Responsive reports
* Mobile-friendly settings

---

## 🚀 Deployment

The project can be deployed using services such as Render.

The deployment architecture is:

```text
User Browser
     ↓
Live React Frontend
     ↓
Live Backend API
     ↓
MongoDB Atlas
```

Environment variables should be configured in the deployment platform instead of exposing them in the source code.

---

## 🧠 What I Learned

Through this project, I learned:

* React components
* Props
* State management
* useState
* useEffect
* React Router
* REST APIs
* CRUD operations
* Node.js
* Express.js
* Middleware
* MongoDB
* Mongoose
* Authentication
* JWT
* Password hashing
* Environment variables
* CORS
* API validation
* Error handling
* LocalStorage
* Git and GitHub
* Responsive CSS
* Deployment

---

## 🎯 Future Improvements

Possible future improvements include:

* Role-based dashboards
* Teacher management
* Course management
* Fee management
* Advanced attendance reports
* Export reports to PDF/Excel
* Password reset functionality
* Profile management
* Better notification system
* Advanced search and filtering
* Automated testing

---

## 👩‍💻 Author

**Sarwat**

Student Management System
React + Node.js + Express + MongoDB

---

## 📌 Project Status

```text
Frontend              ✅
Backend               ✅
MongoDB               ✅
Student CRUD          ✅
Authentication        ✅
JWT                   ✅
Password Hashing      ✅
Attendance            ✅
Reports               ✅
Settings              ✅
Responsive UI         ✅
GitHub                ✅
Deployment            🔄
Documentation         ✅
```

---

## ⭐ Final Project Goal

This project demonstrates a complete full-stack application where:

```text
React
  ↓
REST API
  ↓
Express
  ↓
MongoDB
```

works together with:

```text
JWT Authentication
+
Password Hashing
+
Protected Routes
+
CRUD Operations
+
Responsive UI
```

The final goal is to provide a practical and professional Student Management System while demonstrating the complete journey of data from the browser to the database and back.
