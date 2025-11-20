'use client'

import { useState } from 'react'

interface FormData {
  car_type: string
  pick_up_location: string
  drop_off_location: string
  pick_up_date: string
  pick_up_time: string
  drop_off_date: string
  drop_off_time: string
  customer_name: string
  customer_email: string
  customer_phone: string
}

const TIME_OPTIONS = [
  '12:00AM', '1:00AM', '2:00AM', '3:00AM', '4:00AM', '5:00AM', '6:00AM',
  '7:00AM', '8:00AM', '9:00AM', '10:00AM', '11:00AM',
  '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM',
  '7:00PM', '8:00PM', '9:00PM', '10:00PM', '11:00PM'
]

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    car_type: '',
    pick_up_location: '',
    drop_off_location: '',
    pick_up_date: '',
    pick_up_time: '12:00AM',
    drop_off_date: '',
    drop_off_time: '12:00AM',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Form submitted with data:', formData)
    
    setIsSubmitting(true)
    setMessage(null)

    try {
      console.log('Sending request to /api/reservations')
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: 'Reservation submitted successfully! We will contact you soon.' })
        // Reset form after a short delay
        setTimeout(() => {
          setFormData({
            car_type: '',
            pick_up_location: '',
            drop_off_location: '',
            pick_up_date: '',
            pick_up_time: '12:00AM',
            drop_off_date: '',
            drop_off_time: '12:00AM',
            customer_name: '',
            customer_email: '',
            customer_phone: '',
          })
        }, 2000)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to submit reservation. Please try again.' })
      }
    } catch (error: any) {
      console.error('Form submission error:', error)
      setMessage({ type: 'error', text: `An error occurred: ${error.message || 'Please try again later.'}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-secondary rounded p-5">
      <h4 className="text-white mb-4">CONTINUE CAR RESERVATION</h4>
      {message && (
        <div
          className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <select
              className="form-select"
              name="car_type"
              value={formData.car_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Your Car type</option>
              <option value="VW Golf VII">VW Golf VII</option>
              <option value="Audi A1 S-Line">Audi A1 S-Line</option>
              <option value="Toyota Camry">Toyota Camry</option>
              <option value="BMW 320 ModernLine">BMW 320 ModernLine</option>
            </select>
          </div>
          <div className="col-12">
            <div className="input-group">
              <div className="d-flex align-items-center bg-light text-body rounded-start p-2">
                <span className="fas fa-map-marker-alt"></span>
                <span className="ms-1">Pick Up</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="pick_up_location"
                value={formData.pick_up_location}
                onChange={handleChange}
                placeholder="Enter a City or Airport"
                required
              />
            </div>
          </div>
          <div className="col-12">
            <a href="#" className="text-start text-white d-block mb-2">
              Need a different drop-off location?
            </a>
            <div className="input-group">
              <div className="d-flex align-items-center bg-light text-body rounded-start p-2">
                <span className="fas fa-map-marker-alt"></span>
                <span className="ms-1">Drop off</span>
              </div>
              <input
                className="form-control"
                type="text"
                name="drop_off_location"
                value={formData.drop_off_location}
                onChange={handleChange}
                placeholder="Enter a City or Airport"
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <div className="d-flex align-items-center bg-light text-body rounded-start p-2">
                <span className="fas fa-calendar-alt"></span>
                <span className="ms-1">Pick Up</span>
              </div>
              <input
                className="form-control"
                type="date"
                name="pick_up_date"
                value={formData.pick_up_date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <select
                className="form-select ms-3"
                name="pick_up_time"
                value={formData.pick_up_time}
                onChange={handleChange}
                required
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="input-group">
              <div className="d-flex align-items-center bg-light text-body rounded-start p-2">
                <span className="fas fa-calendar-alt"></span>
                <span className="ms-1">Drop off</span>
              </div>
              <input
                className="form-control"
                type="date"
                name="drop_off_date"
                value={formData.drop_off_date}
                onChange={handleChange}
                min={formData.pick_up_date || new Date().toISOString().split('T')[0]}
                required
              />
              <select
                className="form-select ms-3"
                name="drop_off_time"
                value={formData.drop_off_time}
                onChange={handleChange}
                required
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12">
            <input
              className="form-control"
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Your Name (Optional)"
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              type="email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              placeholder="Your Email (Optional)"
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              type="tel"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              placeholder="Your Phone (Optional)"
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-light w-100 py-2 fw-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-calendar-check me-2"></i>
                  Book Now
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

