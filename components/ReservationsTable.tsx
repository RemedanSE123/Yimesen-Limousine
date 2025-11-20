'use client'

import { Language } from '@/lib/i18n'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/hooks/useLanguage'

interface Reservation {
  id: number
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
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

interface ReservationsTableProps {
  reservations: Reservation[]
  onViewDetails: (reservation: Reservation) => void
  onStatusUpdate: (id: number, status: string) => void
  onDelete: (id: number) => void
  loading: boolean
}

export default function ReservationsTable({
  reservations,
  onViewDetails,
  onStatusUpdate,
  onDelete,
  loading,
}: ReservationsTableProps) {
  const [lang] = useLanguage()
  const t = (key: string) => getTranslation(lang, key)

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'secondary',
      confirmed: 'primary',
      cancelled: 'secondary',
      completed: 'dark',
    }
    return badges[status as keyof typeof badges] || 'secondary'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (reservations.length === 0) {
    return (
      <div className="card shadow-lg border-0">
        <div className="card-body text-center py-5">
          <i className="fas fa-inbox fa-4x text-muted mb-4 opacity-50"></i>
          <p className="text-muted fs-5 fw-semibold">{t('admin.table.noReservations')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card border">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light border-bottom">
              <tr>
                <th>{t('admin.table.id')}</th>
                <th>{t('admin.table.carType')}</th>
                <th>{t('admin.table.customer')}</th>
                <th>{t('admin.table.pickUp')}</th>
                <th>{t('admin.table.dropOff')}</th>
                <th>{t('admin.table.dates')}</th>
                <th>{t('admin.table.status')}</th>
                <th>{t('admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>
                    <strong>#{reservation.id}</strong>
                  </td>
                  <td>{reservation.car_type}</td>
                  <td>
                    {reservation.customer_name || 'N/A'}
                    <br />
                    <small className="text-muted">{reservation.customer_email}</small>
                  </td>
                  <td>{reservation.pick_up_location}</td>
                  <td>{reservation.drop_off_location}</td>
                  <td>
                    <small>
                      {formatDate(reservation.pick_up_date)} {reservation.pick_up_time}
                      <br />
                      to {formatDate(reservation.drop_off_date)} {reservation.drop_off_time}
                    </small>
                  </td>
                  <td>
                    <span className={`badge bg-${getStatusBadge(reservation.status)}`}>
                      {reservation.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onViewDetails(reservation)}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <select
                        className="form-select form-select-sm d-inline-block"
                        style={{ width: '130px' }}
                        value={reservation.status}
                        onChange={(e) => onStatusUpdate(reservation.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(reservation.id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

