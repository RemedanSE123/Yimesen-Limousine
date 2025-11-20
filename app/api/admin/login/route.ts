import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// Simple admin authentication
// In production, use proper authentication (JWT, sessions, etc.)
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'

    // Simple authentication (for demo - use proper auth in production)
    if (username === adminUsername && password === adminPassword) {
      // Generate simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')

      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials. Username: admin, Password: admin' },
        { status: 401 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Login failed', details: error.message },
      { status: 500 }
    )
  }
}

