# PostgreSQL Database Setup

## Quick Start

1. **Create the database:**
   ```sql
   CREATE DATABASE car_rental_db;
   ```

2. **Connect to the database:**
   ```bash
   psql -U your_username -d car_rental_db
   ```

3. **Run the schema file:**
   ```bash
   psql -U your_username -d car_rental_db -f database/schema.sql
   ```

   Or copy and paste the SQL below into your PostgreSQL client.

## Complete SQL Schema

```sql
-- Car Rental Reservation Database Schema
-- PostgreSQL Database

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  car_type VARCHAR(255) NOT NULL,
  pick_up_location VARCHAR(255) NOT NULL,
  drop_off_location VARCHAR(255) NOT NULL,
  pick_up_date DATE NOT NULL,
  pick_up_time VARCHAR(50) NOT NULL,
  drop_off_date DATE NOT NULL,
  drop_off_time VARCHAR(50) NOT NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_pick_up_date ON reservations(pick_up_date);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at);
CREATE INDEX IF NOT EXISTS idx_reservations_customer_email ON reservations(customer_email);

-- Admin users table (for future use)
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_reservations_updated_at 
    BEFORE UPDATE ON reservations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE reservations IS 'Stores all car rental reservations';
COMMENT ON COLUMN reservations.status IS 'Reservation status: pending, confirmed, cancelled, completed';
COMMENT ON TABLE admin_users IS 'Stores admin user credentials';
```

## Database Structure

### Reservations Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key (auto-increment) |
| car_type | VARCHAR(255) | Type of car (e.g., "VW Golf VII") |
| pick_up_location | VARCHAR(255) | Pick-up location |
| drop_off_location | VARCHAR(255) | Drop-off location |
| pick_up_date | DATE | Pick-up date |
| pick_up_time | VARCHAR(50) | Pick-up time |
| drop_off_date | DATE | Drop-off date |
| drop_off_time | VARCHAR(50) | Drop-off time |
| customer_name | VARCHAR(255) | Customer name (optional) |
| customer_email | VARCHAR(255) | Customer email (optional) |
| customer_phone | VARCHAR(50) | Customer phone (optional) |
| status | VARCHAR(50) | Status: pending, confirmed, cancelled, completed |
| notes | TEXT | Additional notes |
| created_at | TIMESTAMP | When reservation was created |
| updated_at | TIMESTAMP | Last update time (auto-updated) |

### Status Values

- **pending**: New reservation, awaiting confirmation
- **confirmed**: Reservation confirmed by admin
- **cancelled**: Reservation cancelled
- **completed**: Reservation completed

## Environment Variables

After creating the database, set these in your `.env.local` file:

```env
# Option 1: Connection String
DATABASE_URL=postgresql://username:password@localhost:5432/car_rental_db

# Option 2: Individual Parameters
DB_HOST=localhost
DB_PORT=5432
DB_NAME=car_rental_db
DB_USER=your_username
DB_PASSWORD=your_password
```

## Verify Installation

Test the database connection:

```sql
-- Check if tables exist
\dt

-- Check reservations table structure
\d reservations

-- Test insert
INSERT INTO reservations (
  car_type, pick_up_location, drop_off_location,
  pick_up_date, pick_up_time, drop_off_date, drop_off_time
) VALUES (
  'Test Car', 'Test Location', 'Test Drop Off',
  CURRENT_DATE, '12:00PM', CURRENT_DATE + INTERVAL '3 days', '12:00PM'
);

-- Check data
SELECT * FROM reservations;

-- Clean up test
DELETE FROM reservations WHERE car_type = 'Test Car';
```

## Next Steps

1. Set up environment variables (see `.env.local.example`)
2. Install npm dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Test the booking form on the homepage
5. Login to admin dashboard at `/admin/login`

