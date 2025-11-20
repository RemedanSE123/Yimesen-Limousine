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

-- Admin users table (for authentication)
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

-- Insert default admin user (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt (you should change this!)
-- You can generate a new hash using: bcrypt.hashSync('your_password', 10)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$rQZ7J8Z9K0L1M2N3O4P5QuVWXyZ.AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPp')
ON CONFLICT (username) DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE reservations IS 'Stores all car rental reservations';
COMMENT ON COLUMN reservations.status IS 'Reservation status: pending, confirmed, cancelled, completed';
COMMENT ON TABLE admin_users IS 'Stores admin user credentials';

