# 📘 BookEase

## Modern Full-Stack Booking Management System

BookEase is a modern full-stack booking management system developed using **Next.js**, **NestJS**, **PostgreSQL**, and **Prisma ORM**. The platform enables users to browse available services, make bookings, and securely manage appointments through a responsive web application. Administrators can manage services, bookings, and customer information using a dedicated dashboard.

---

## ✨ Key Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Secure Authorization

### 🛠 Service Management

- Create Services
- View All Services
- View Individual Service Details
- Update Services
- Delete Services
- Activate / Deactivate Services

### 📅 Booking Management

- Create Booking
- View All Bookings
- View Booking Details
- Update Booking
- Cancel Booking
- Update Booking Status
- Delete Booking
- Duplicate Booking Validation
- Booking Date Validation

### 📊 Advanced Features

- Pagination
- Search
- Filtering
- Sorting
- Request Validation
- Swagger API Documentation
- Global Exception Handling
- Standard API Response Format
- HTTP Request Logging

---

# 🛠 Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- TanStack Query
- Framer Motion

## Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Passport
- Swagger

---

# 🏗 System Architecture

```text
                BookEase Platform

        ┌──────────────────────────────┐
        │      Next.js Frontend        │
        └──────────────┬───────────────┘
                       │
                 HTTPS REST API
                       │
        ┌──────────────▼───────────────┐
        │        NestJS Backend        │
        │                              │
        │ • Authentication             │
        │ • Services                   │
        │ • Bookings                   │
        └──────────────┬───────────────┘
                       │
                  Prisma ORM
                       │
        ┌──────────────▼───────────────┐
        │      PostgreSQL Database     │
        └──────────────────────────────┘
```

---

# 📂 Project Structure

```text
BookEase
│
├── backend
│   ├── auth
│   ├── bookings
│   ├── services
│   ├── users
│   ├── prisma
│   ├── common
│   └── main.ts
│
└── frontend
    ├── app
    ├── components
    ├── hooks
    ├── services
    ├── lib
    ├── types
    └── public
```

---

# 🚀 Core Functionalities

✅ User Authentication

✅ Service Management

✅ Booking Management

✅ Booking Status Management

✅ Pagination

✅ Search

✅ Filtering

✅ Sorting

✅ JWT Authorization

✅ DTO Validation

✅ Swagger Documentation

✅ Request Logging

✅ Global Exception Filter

✅ Standardized API Responses

---

# 📷 Application Screens

- Home Page
- Services Page
- Service Details
- Booking Page
- Login
- Register
- User Dashboard
- Admin Dashboard
- Booking Management
- Services Management

> _(Add screenshots after completing the frontend.)_

---

# 📚 API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api
```

---

# 🔐 Authentication Flow

```text
User
 │
 ▼
Login
 │
 ▼
JWT Token Generated
 │
 ▼
Bearer Token
 │
 ▼
Protected API Routes
```

---

# 📈 Project Highlights

- Modern Full-Stack Architecture
- RESTful API Design
- Clean Code Structure
- Modular Architecture
- Secure Authentication
- Responsive User Interface
- Enterprise-Level Backend Practices
- Scalable Database Design

---

# 🔮 Future Enhancements

- Online Payment Integration
- Email Notifications
- Booking Reminder System
- Customer Reviews & Ratings
- Real-Time Appointment Availability
- Booking Calendar View
- Admin Analytics Dashboard
- User Profile Management
- Service Categories
- Image Upload Support

---

# 👨‍💻 Author - github.com/UdeshaRashmi

Developed as a modern full-stack booking management system using Next.js, NestJS, Prisma ORM, and PostgreSQL.
