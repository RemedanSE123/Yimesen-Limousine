# Admin Dashboard Setup Guide

## Database Setup

1. **Install PostgreSQL** (if not already installed)

2. **Create Database:**
   ```sql
   CREATE DATABASE car_rental_db;
   ```

3. **Run the Schema:**
   ```bash
   psql -U your_username -d car_rental_db -f database/schema.sql
   ```

   Or manually copy and run the SQL from `database/schema.sql` in your PostgreSQL client.

## Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your database credentials:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/car_rental_db
   
   # Or use individual parameters:
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=car_rental_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   
   # Admin credentials (change these!)
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ADMIN_SESSION_SECRET=your-secret-key-change-this
   ```

## Install Dependencies

```bash
npm install
```

This will install:
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing (for future use)

## Start the Development Server

```bash
npm run dev
```

## Access Admin Dashboard

1. Navigate to: `http://localhost:3000/admin/login`

2. Login with:
   - Username: `admin` (or your ADMIN_USERNAME)
   - Password: `admin123` (or your ADMIN_PASSWORD)

3. Access the dashboard at: `http://localhost:3000/admin`

## Features

### Admin Dashboard
- **Statistics Cards**: View total, pending, confirmed, cancelled, completed, and today's reservations
- **Reservation Table**: View all reservations with filtering and search
- **Status Management**: Update reservation status directly from the table
- **Reservation Details**: Click the eye icon to view full reservation details
- **Delete Reservations**: Remove unwanted reservations

### Booking Form
- Customers can submit reservations through the homepage carousel
- Form validation and success/error messages
- All reservations are stored in the database

## API Endpoints

- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations` - Get all reservations (admin)
- `GET /api/reservations?stats=true` - Get statistics
- `GET /api/reservations/[id]` - Get a single reservation
- `PATCH /api/reservations/[id]` - Update reservation status
- `DELETE /api/reservations/[id]` - Delete a reservation
- `POST /api/admin/login` - Admin login

## Security Notes

⚠️ **Important**: The current authentication is basic for development. For production:

1. Use proper JWT authentication
2. Implement password hashing with bcryptjs
3. Add rate limiting
4. Use environment variables for all secrets
5. Implement CSRF protection
6. Add input sanitization
7. Use HTTPS in production

## Database Schema

The database includes:
- `reservations` table - Stores all car rental reservations
- `admin_users` table - For admin authentication (future use)
- Indexes for performance optimization
- Automatic timestamp updates

## Troubleshooting

### Database Connection Error
- Check your database credentials in `.env.local`
- Ensure PostgreSQL is running
- Verify database exists
- Check firewall/network settings

### Cannot Login to Admin
- Verify ADMIN_USERNAME and ADMIN_PASSWORD in `.env.local`
- Clear browser localStorage and try again
- Check browser console for errors

### Reservations Not Showing
- Check database connection
- Verify reservations table exists
- Check API response in browser network tab

