import { NextRequest, NextResponse } from 'next/server'
import {
  getReservationById,
  updateReservationStatus,
  deleteReservation,
} from '@/lib/db'

// GET /api/reservations/[id] - Get a single reservation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid reservation ID' }, { status: 400 })
    }

    const reservation = await getReservationById(id)

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, reservation })
  } catch (error: any) {
    console.error('Error fetching reservation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reservation', details: error.message },
      { status: 500 }
    )
  }
}

// PATCH /api/reservations/[id] - Update reservation status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid reservation ID' }, { status: 400 })
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const reservation = await updateReservationStatus(id, status)

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation updated successfully',
      reservation,
    })
  } catch (error: any) {
    console.error('Error updating reservation:', error)
    return NextResponse.json(
      { error: 'Failed to update reservation', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/reservations/[id] - Delete a reservation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid reservation ID' }, { status: 400 })
    }

    const reservation = await deleteReservation(id)

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting reservation:', error)
    return NextResponse.json(
      { error: 'Failed to delete reservation', details: error.message },
      { status: 500 }
    )
  }
}

