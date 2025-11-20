# Quick Start Guide

## ✅ Database Connected

Your Neon PostgreSQL database is now connected:
- Database: `car_rental_db`
- Connection: Neon PostgreSQL (SSL required)

## 🔐 Admin Login Credentials

- **Username:** `admin`
- **Password:** `admin`

## 📋 Next Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database Tables

Run the schema SQL file in your Neon database:

**Option A: Using Neon Console**
1. Go to your Neon dashboard
2. Open SQL Editor
3. Copy the contents of `database/schema.sql`
4. Paste and execute

**Option B: Using psql**
```bash
psql "postgresql://neondb_owner:npg_ebDG7l2MovsF@ep-empty-wave-ahpg3lno-pooler.c-3.us-east-1.aws.neon.tech/car_rental_db?sslmode=require&channel_binding=require" -f database/schema.sql
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test the Application

1. **Homepage:** `http://localhost:3000`
   - Test the booking form
   - Submit a reservation

2. **Admin Login:** `http://localhost:3000/admin/login`
   - Username: `admin`
   - Password: `admin`

3. **Admin Dashboard:** `http://localhost:3000/admin`
   - View all reservations
   - Update status
   - Delete reservations

## 🗄️ Database Connection

The connection is configured in `.env.local`:
```
DATABASE_URL=postgresql://neondb_owner:****@ep-empty-wave-ahpg3lno-pooler.c-3.us-east-1.aws.neon.tech/car_rental_db?sslmode=require&channel_binding=require
```

## 🔧 Configuration

Admin credentials are set in `.env.local`:
- `ADMIN_USERNAME=admin`
- `ADMIN_PASSWORD=admin`

**⚠️ Security Note:** Change these credentials in production!

## 📊 Database Schema

The database includes:
- `reservations` table - Stores all car rental bookings
- Indexes for performance
- Auto-updating timestamps

## 🚀 Ready to Go!

Everything is configured. Just:
1. Run `npm install`
2. Set up the database tables (run schema.sql)
3. Start with `npm run dev`
4. Login to admin dashboard with `admin`/`admin`

