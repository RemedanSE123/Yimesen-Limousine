import { Pool } from 'pg'

// Database connection pool
let pool: Pool | null = null

function createPool() {
  if (pool) return pool

  // Use DATABASE_URL if available, otherwise use individual params
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    // Build connection string from individual parameters
    const config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'car_rental_db',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }

    pool = new Pool(config)
  } else {
    // For Neon PostgreSQL, SSL is required
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })

  return pool
}

export function getPool() {
  return createPool()
}

// Test database connection
export async function testConnection() {
  try {
    const pool = getPool()
    const result = await pool.query('SELECT NOW()')
    console.log('Database connected successfully:', result.rows[0])
    return true
  } catch (error) {
    console.error('Database connection error:', error)
    return false
  }
}

// Reservation types
export interface Reservation {
  id?: number
  car_type: string
  pick_up_location: string
  drop_off_location: string
  pick_up_date: string
  pick_up_time: string
  drop_off_date: string
  drop_off_time: string
  customer_name?: string
  customer_email?: string
  customer_phone?: string
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  created_at?: string
  updated_at?: string
}

// Database query functions
export async function createReservation(reservation: Reservation) {
  const pool = getPool()
  const query = `
    INSERT INTO reservations (
      car_type, pick_up_location, drop_off_location,
      pick_up_date, pick_up_time, drop_off_date, drop_off_time,
      customer_name, customer_email, customer_phone, notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `
  
  const values = [
    reservation.car_type,
    reservation.pick_up_location,
    reservation.drop_off_location,
    reservation.pick_up_date,
    reservation.pick_up_time,
    reservation.drop_off_date,
    reservation.drop_off_time,
    reservation.customer_name || null,
    reservation.customer_email || null,
    reservation.customer_phone || null,
    reservation.notes || null,
  ]

  const result = await pool.query(query, values)
  return result.rows[0]
}

export async function getReservations(filters?: {
  status?: string
  startDate?: string
  endDate?: string
  limit?: number
  offset?: number
}) {
  const pool = getPool()
  let query = 'SELECT * FROM reservations WHERE 1=1'
  const values: any[] = []
  let paramCount = 1

  if (filters?.status) {
    query += ` AND status = $${paramCount}`
    values.push(filters.status)
    paramCount++
  }

  if (filters?.startDate) {
    query += ` AND pick_up_date >= $${paramCount}`
    values.push(filters.startDate)
    paramCount++
  }

  if (filters?.endDate) {
    query += ` AND pick_up_date <= $${paramCount}`
    values.push(filters.endDate)
    paramCount++
  }

  query += ' ORDER BY created_at DESC'

  if (filters?.limit) {
    query += ` LIMIT $${paramCount}`
    values.push(filters.limit)
    paramCount++
  }

  if (filters?.offset) {
    query += ` OFFSET $${paramCount}`
    values.push(filters.offset)
    paramCount++
  }

  const result = await pool.query(query, values)
  return result.rows
}

export async function getReservationById(id: number) {
  const pool = getPool()
  const query = 'SELECT * FROM reservations WHERE id = $1'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

export async function updateReservationStatus(id: number, status: string) {
  const pool = getPool()
  const query = 'UPDATE reservations SET status = $1 WHERE id = $2 RETURNING *'
  const result = await pool.query(query, [status, id])
  return result.rows[0]
}

export async function deleteReservation(id: number) {
  const pool = getPool()
  const query = 'DELETE FROM reservations WHERE id = $1 RETURNING *'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

export async function getReservationStats() {
  const pool = getPool()
  const query = `
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
      COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled,
      COUNT(*) FILTER (WHERE status = 'completed') as completed,
      COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE) as today
    FROM reservations
  `
  const result = await pool.query(query)
  return result.rows[0]
}

