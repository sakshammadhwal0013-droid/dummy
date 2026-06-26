# Safarnama Deployment Guide

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- Razorpay API Keys
- WhatsApp / Twilio API Keys
- SendGrid / Nodemailer SMTP Credentials

## Setup Instructions
1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Update your `.env` file with production credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/safarnama"
   JWT_SECRET="your_secure_random_string"
   RAZORPAY_KEY_ID="your_razorpay_key"
   RAZORPAY_KEY_SECRET="your_razorpay_secret"
   SMTP_HOST="smtp.example.com"
   SMTP_USER="your_email"
   SMTP_PASS="your_password"
   WHATSAPP_API_URL="https://api.whatsapp.com/..."
   WHATSAPP_TOKEN="your_whatsapp_token"
   ```

3. **Database Migration:**
   Update `prisma/schema.prisma` to use `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
   Run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Build the Application:**
   ```bash
   npm run build
   ```

5. **Start Production Server:**
   ```bash
   npm run start
   ```

## Folder Structure
- `src/controllers/` - API Route Handlers
- `src/routes/` - Express Router Configurations
- `src/middlewares/` - Auth, Validation, Error Handling
- `src/db/` - Prisma Client and Schema Setup
- `docs/` - API and Deployment Documentation
