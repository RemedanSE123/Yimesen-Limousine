// Test database connection script
// Run this to verify your database connection is working

import { getPool, testConnection } from './db'

async function test() {
  console.log('Testing database connection...')
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set')
  
  const connected = await testConnection()
  
  if (connected) {
    console.log('✅ Database connection successful!')
    
    // Test query
    try {
      const pool = getPool()
      const result = await pool.query('SELECT NOW() as current_time, version() as pg_version')
      console.log('✅ Query successful!')
      console.log('Current time:', result.rows[0].current_time)
      console.log('PostgreSQL version:', result.rows[0].pg_version.split(',')[0])
      
      // Check if tables exist
      const tables = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `)
      console.log('\n📊 Tables in database:')
      if (tables.rows.length === 0) {
        console.log('⚠️  No tables found. Please run the schema.sql file.')
      } else {
        tables.rows.forEach((row: any) => {
          console.log(`  - ${row.table_name}`)
        })
      }
    } catch (error: any) {
      console.error('❌ Error executing query:', error.message)
    }
    
    process.exit(0)
  } else {
    console.error('❌ Database connection failed!')
    console.error('Please check your DATABASE_URL in .env.local')
    process.exit(1)
  }
}

test()

