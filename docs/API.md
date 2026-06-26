# Safarnama API Documentation

## Authentication (`/api/auth`)
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate and get JWT token
- **POST** `/api/auth/forgot-password` - Request a password reset

## Admin Dashboard (`/api/admin`)
- **GET** `/api/admin/stats` - Get summary statistics (Total Bookings, Revenue, Users, Visits)
- **GET** `/api/admin/bookings` - List all recent transactions/bookings
- **GET** `/api/admin/analytics` - Get analytics for Recharts (Category Breakdown, Trending Items)
- **POST** `/api/admin/bookings/:id/status` - Update a booking status (Confirmed, Cancelled)

## User Management (`/api/users`)
- **GET** `/api/user/bookings` - Get bookings for the authenticated user
- **POST** `/api/user/bookings` - Create a new booking
- **GET** `/api/users/profile` - Get the current user profile
- **PUT** `/api/users/profile` - Update profile information
- **GET** `/api/users` - List users (Admin)

## Tour Packages (`/api/tours`)
- **GET** `/api/tours` - List all tour packages
- **POST** `/api/tours` - Create a new tour package (Admin)
- **PUT** `/api/tours/:id` - Update a tour package (Admin)
- **DELETE** `/api/tours/:id` - Delete a tour package (Admin)

## Hotels (`/api/hotels`)
- **GET** `/api/hotels` - List all hotels
- **POST** `/api/hotels` - Create a new hotel (Admin)
- **PUT** `/api/hotels/:id` - Update a hotel (Admin)
- **DELETE** `/api/hotels/:id` - Delete a hotel (Admin)

## Payments (`/api/payments`)
- **POST** `/api/payments/create` - Initialize Razorpay Order
- **POST** `/api/payments/verify` - Verify Razorpay payment signature
- **GET** `/api/payments` - List payment history

## Reports (`/api/reports`)
- **GET** `/api/reports/invoice/:id` - Generate and download a PDF invoice
- **GET** `/api/reports/excel` - Export data to Excel
