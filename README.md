# BookEase Healthcare Booking Platform

BookEase is a full-stack healthcare appointment booking platform built with a NestJS API, PostgreSQL database, Prisma ORM, and a responsive Next.js frontend. It helps patients browse healthcare services, choose a preferred doctor, select a date and time, and submit appointment requests through a clean customer-facing interface.

The system also includes protected staff tools for managing healthcare services, assigned doctors, appointments, booking statuses, and customer requests.

## Project Overview

BookEase is designed around a simple healthcare booking flow:

1. Patients browse available healthcare services.
2. Patients choose a service, assigned doctor, date, and time.
3. Guests can submit bookings without authentication.
4. Registered users can view and manage their own bookings.
5. Staff/admin users can manage services, doctors, and all booking records.

The project is split into two parts:

- Backend API: NestJS, TypeScript, Prisma, PostgreSQL
- Frontend app: Next.js, React, TypeScript, Tailwind CSS

## Key Features

- JWT authentication for customers and admins
- Customer registration and login
- Admin registration and login
- Public healthcare service browsing
- Service management with assigned doctor names
- Public appointment request creation
- Registered-user booking history
- Admin booking management
- Booking status updates
- Booking cancellation rules
- Pagination, search, filtering, and sorting for bookings
- Public contact page with healthcare support details
- Responsive customer-first pages for home, about, services, booking, and contact
- DTO validation with class-validator
- Global exception handling
- Standard API response formatting
- Swagger API documentation
- Responsive public, customer, and admin interfaces

## Technology Stack

### Backend

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT and Passport
- bcrypt
- Swagger
- class-validator

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- TanStack Query
- React Hook Form
- Zod
- Lucide React

## Project Structure

```text
bookease-api/
|-- prisma/
|   |-- schema.prisma
|   `-- migrations/
|-- src/
|   |-- auth/
|   |-- bookings/
|   |-- common/
|   |-- prisma/
|   |-- services/
|   |-- users/
|   |-- app.module.ts
|   `-- main.ts
|-- bookease-frontend/
|   |-- app/
|   |-- components/
|   |-- features/
|   |-- lib/
|   |-- providers/
|   |-- public/
|   |-- schemas/
|   `-- types/
|-- generated/
|-- package.json
`-- README.md
```

## Installation Steps

Clone the repository and install dependencies for both backend and frontend.

```bash
git clone <your-repository-url>
cd bookease-api
npm install
cd bookease-frontend
npm install
```

Return to the backend root when running backend commands:

```bash
cd ..
```

## Environment Variables

Do not commit real `.env` or `.env.local` files. Use placeholders like the examples below.

### Backend `.env.example`

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
JWT_SECRET="<your-secure-jwt-secret>"
PORT=3000
```

### Frontend `.env.local.example`

Create a `.env.local` file inside `bookease-frontend/`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Database Setup

BookEase uses PostgreSQL with Prisma.

1. Create a PostgreSQL database.
2. Add your database connection string to the backend `.env`.
3. Generate the Prisma client.
4. Run database migrations.

```bash
npx prisma generate
npx prisma migrate deploy
```

For local development, you can also use:

```bash
npx prisma migrate dev
```

## Running Migrations

Migration files are stored in:

```text
prisma/migrations/
```

To apply all existing migrations to a database:

```bash
npx prisma migrate deploy
```

To check migration status:

```bash
npx prisma migrate status
```

To inspect the database visually:

```bash
npx prisma studio
```

## Running the Application

Run the backend API from the project root:

```bash
npm run start:dev
```

The backend runs on:

```text
http://localhost:3000
```

Run the frontend from `bookease-frontend/`:

```bash
cd bookease-frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:3001
```

## API Documentation

Swagger documentation is available after starting the backend:

```text
http://localhost:3000/api
```

Swagger includes the main authentication, services, and bookings endpoints. Protected endpoints require a Bearer token.

## Frontend Pages

The public frontend is designed as a customer-first healthcare booking experience:

- `/` - healthcare appointment landing page
- `/about` - platform overview and booking flow
- `/services` - public healthcare service list
- `/services/:id` - service details with doctor information
- `/book` - appointment request form
- `/contact` - public support and contact page
- `/user` - customer login
- `/signup` - customer registration
- `/account` - customer booking area
- `/login` - staff/admin login
- `/admin` - protected admin dashboard

The frontend includes responsive desktop and mobile layouts. The contact page uses local video assets stored in `bookease-frontend/public/`; keep only public-safe media files in that folder.

## Main API Endpoints

### Authentication

```text
POST /auth/register
POST /auth/register-admin
POST /auth/login
```

Admins use the same login endpoint. Access to admin features is controlled by role-based authorization.

### Services

```text
POST   /services
GET    /services
GET    /services/:id
PATCH  /services/:id
DELETE /services/:id
```

Service management endpoints are protected and intended for staff/admin users.

### Bookings

```text
POST   /bookings
POST   /bookings/my/bookings
GET    /bookings
GET    /bookings/:id
PUT    /bookings/:id
PATCH  /bookings/:id
PATCH  /bookings/:id/status
PATCH  /bookings/:id/cancel
DELETE /bookings/:id
```

### Customer Bookings

```text
GET   /bookings/my/bookings
GET   /bookings/my/bookings/:id
PATCH /bookings/my/bookings/:id
PATCH /bookings/my/bookings/:id/cancel
```

## Business Rules

- A booking must belong to an existing healthcare service.
- Inactive services cannot be booked.
- Booking dates cannot be in the past.
- Duplicate bookings are prevented for the same service, date, and time.
- Cancelled bookings cannot be marked as completed.
- Completed bookings cannot be cancelled.
- Guests can create bookings without authentication.
- Registered users can manage their own bookings.
- Staff/admin users manage services and all booking records.

## Database Models

### User

- id
- name
- email
- password
- role
- bookings
- createdAt
- updatedAt

### Service

- id
- title
- description
- doctorName
- duration
- price
- isActive
- bookings
- createdAt
- updatedAt

### Booking

- id
- customerName
- customerEmail
- customerPhone
- serviceId
- userId
- bookingDate
- bookingTime
- status
- notes
- createdAt
- updatedAt

## Booking Statuses

```text
PENDING
CONFIRMED
CANCELLED
COMPLETED
```

## Assumptions Made

- PostgreSQL is used as the database.
- Healthcare services are managed by authorized staff/admin users.
- Each service can have one assigned doctor name.
- Customers can create appointment requests without logging in.
- Logged-in customers can view and manage bookings created under their account.
- Appointment requests start with the `PENDING` status.
- The platform stores appointment requests, not real-time doctor availability.
- Payments, email notifications, and SMS reminders are outside the current scope.
- Public contact details and media assets are demo-safe content and can be replaced for a real deployment.

## Testing and Verification

Backend build:

```bash
npm run build
```

Frontend lint and build:

```bash
cd bookease-frontend
npm run lint
npm run build
```

Unit test files are included in the backend project. Some starter test files may require dependency mocks or module imports before they can run successfully in isolation.

## Future Improvements

- Refresh token support
- Docker and Docker Compose setup
- Email appointment confirmations
- SMS reminders
- Doctor availability calendar
- Service categories
- Patient profile page
- Admin analytics dashboard
- Better unit and integration test coverage
- Appointment rescheduling workflow
- Payment integration

## Developer

Developed by Parana Manage Udesha Rashmi as a full-stack healthcare booking platform using NestJS, Next.js, Prisma, and PostgreSQL.
