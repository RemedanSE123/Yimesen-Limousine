'use client'

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

interface ReservationModalProps {
  reservation: Reservation
  onClose: () => void
  onStatusUpdate: (id: number, status: string) => void
}

export default function ReservationModal({
  reservation,
  onClose,
  onStatusUpdate,
}: ReservationModalProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusUpdate(reservation.id, e.target.value)
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'secondary',
      confirmed: 'primary',
      cancelled: 'secondary',
      completed: 'dark',
    }
    return badges[status as keyof typeof badges] || 'secondary'
  }

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Reservation Details #{reservation.id}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="col-md-6">
                <h6 className="text-dark mb-3 fw-semibold">
                  <i className="fas fa-car me-2 text-primary"></i>Car Information
                </h6>
                <p>
                  <strong>Car Type:</strong> {reservation.car_type}
                </p>
              </div>
              <div className="col-md-6">
                <h6 className="text-dark mb-3 fw-semibold">
                  <i className="fas fa-info-circle me-2 text-primary"></i>Status
                </h6>
                <select
                  className="form-select"
                  value={reservation.status}
                  onChange={handleStatusChange}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="col-md-6">
                <h6 className="text-dark mb-3 fw-semibold">
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>Pick Up
                </h6>
                <p>
                  <strong>Location:</strong> {reservation.pick_up_location}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(reservation.pick_up_date)}
                </p>
                <p>
                  <strong>Time:</strong> {reservation.pick_up_time}
                </p>
              </div>

              <div className="col-md-6">
                <h6 className="text-dark mb-3 fw-semibold">
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>Drop Off
                </h6>
                <p>
                  <strong>Location:</strong> {reservation.drop_off_location}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(reservation.drop_off_date)}
                </p>
                <p>
                  <strong>Time:</strong> {reservation.drop_off_time}
                </p>
              </div>

              <div className="col-12">
                <h6 className="text-dark mb-3 fw-semibold">
                  <i className="fas fa-user me-2 text-primary"></i>Customer Information
                </h6>
                <div className="row">
                  <div className="col-md-4">
                    <p>
                      <strong>Name:</strong>
                      <br />
                      {reservation.customer_name || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Email:</strong>
                      <br />
                      {reservation.customer_email ? (
                        <a href={`mailto:${reservation.customer_email}`}>
                          {reservation.customer_email}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Phone:</strong>
                      <br />
                      {reservation.customer_phone ? (
                        <a href={`tel:${reservation.customer_phone}`}>
                          {reservation.customer_phone}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {reservation.notes && (
                <div className="col-12">
                  <h6 className="text-dark mb-3 fw-semibold">
                    <i className="fas fa-sticky-note me-2 text-primary"></i>Notes
                  </h6>
                  <p className="text-muted">{reservation.notes}</p>
                </div>
              )}

              <div className="col-12">
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">
                      <strong>Created:</strong> {formatDate(reservation.created_at)}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">
                      <strong>Last Updated:</strong> {formatDate(reservation.updated_at)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

