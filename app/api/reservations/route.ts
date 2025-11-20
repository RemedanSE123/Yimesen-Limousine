import { NextRequest, NextResponse } from 'next/server'
import {
  createReservation,
  getReservations,
  getReservationStats,
  Reservation,
} from '@/lib/db'

// POST /api/reservations - Create a new reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received reservation request:', body)

    // Validate required fields
    if (
      !body.car_type ||
      !body.pick_up_location ||
      !body.drop_off_location ||
      !body.pick_up_date ||
      !body.pick_up_time ||
      !body.drop_off_date ||
      !body.drop_off_time
    ) {
      console.error('Missing required fields:', body)
      return NextResponse.json(
        { error: 'Missing required fields', received: body },
        { status: 400 }
      )
    }

    // Validate dates
    const pickUpDate = new Date(body.pick_up_date)
    const dropOffDate = new Date(body.drop_off_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (pickUpDate < today) {
      return NextResponse.json(
        { error: 'Pick-up date cannot be in the past' },
        { status: 400 }
      )
    }

    if (dropOffDate < pickUpDate) {
      return NextResponse.json(
        { error: 'Drop-off date cannot be before pick-up date' },
        { status: 400 }
      )
    }

    // Create reservation
    const reservation = await createReservation(body)

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation created successfully',
        reservation,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to create reservation', details: error.message },
      { status: 500 }
    )
  }
}

// GET /api/reservations - Get all reservations (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication (simple check for now)
    const authHeader = request.headers.get('authorization')
    const isAdmin = authHeader === `Bearer ${process.env.ADMIN_SESSION_SECRET}`

    // For now, allow access but you should implement proper auth
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const stats = searchParams.get('stats')

    // If stats requested, return statistics
    if (stats === 'true') {
      const statistics = await getReservationStats()
      return NextResponse.json({ success: true, stats: statistics })
    }

    // Get reservations with filters
    const reservations = await getReservations({
      status: status || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    })

    return NextResponse.json({
      success: true,
      reservations,
      count: reservations.length,
    })
  } catch (error: any) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reservations', details: error.message },
      { status: 500 }
    )
  }
}

