'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Language } from '@/lib/i18n'
import { getTranslation } from '@/lib/i18n'
import { useLanguage } from '@/hooks/useLanguage'
import ReservationsTable from './ReservationsTable'
import ReservationModal from './ReservationModal'

interface Stats {
  total: string
  pending: string
  confirmed: string
  cancelled: string
  completed: string
  today: string
}

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

export default function AdminDashboard() {
  const [lang, setLang] = useLanguage()
  const [stats, setStats] = useState<Stats | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const t = (key: string) => getTranslation(lang, key)

  useEffect(() => {
    fetchData()
  }, [filter])

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')

      // Fetch stats
      const statsResponse = await fetch('/api/reservations?stats=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const statsData = await statsResponse.json()
      if (statsData.success) {
        setStats(statsData.stats)
      }

      // Fetch reservations
      const params = new URLSearchParams()
      if (filter !== 'all') {
        params.append('status', filter)
      }

      const resResponse = await fetch(`/api/reservations?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const resData = await resResponse.json()
      if (resData.success) {
        setReservations(resData.reservations)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setShowModal(true)
  }

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this reservation?')) {
      return
    }

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error deleting reservation:', error)
    }
  }

  const filteredReservations = reservations.filter((res) => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      res.car_type?.toLowerCase().includes(search) ||
      res.pick_up_location?.toLowerCase().includes(search) ||
      res.customer_name?.toLowerCase().includes(search) ||
      res.customer_email?.toLowerCase().includes(search) ||
      res.customer_phone?.toLowerCase().includes(search)
    )
  })

  if (loading && !stats) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="mb-4 pb-3 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h4 mb-1 fw-bold text-dark">
              <i className="fas fa-tachometer-alt me-2 text-primary"></i>
              {t('admin.title')}
            </h1>
            <p className="mb-0 text-muted small">{t('admin.manage')}</p>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <select
              className="form-select form-select-sm border"
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              style={{ width: 'auto', minWidth: '120px' }}
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="pt">🇵🇹 Português</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="zh">🇨🇳 中文</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="ru">🇷🇺 Русский</option>
            </select>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>{t('admin.logout')}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards - Clean and Simple */}
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-2">
          <div className="card border h-100">
            <div className="card-body text-center p-3">
              <div className="text-muted mb-2">
                <i className="fas fa-calendar-check fa-2x"></i>
              </div>
              <h3 className="mb-1 fw-bold">{stats?.total || '0'}</h3>
              <p className="text-muted mb-0 small">{t('admin.stats.total')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-2">
          <div className="card border h-100">
            <div className="card-body text-center p-3">
              <div className="text-muted mb-2">
                <i className="fas fa-clock fa-2x"></i>
              </div>
              <h3 className="mb-1 fw-bold">{stats?.pending || '0'}</h3>
              <p className="text-muted mb-0 small">{t('admin.stats.pending')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-2">
          <div className="card border h-100">
            <div className="card-body text-center p-3">
              <div className="text-muted mb-2">
                <i className="fas fa-check-circle fa-2x"></i>
              </div>
              <h3 className="mb-1 fw-bold">{stats?.confirmed || '0'}</h3>
              <p className="text-muted mb-0 small">{t('admin.stats.confirmed')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-2">
          <div className="card border h-100">
            <div className="card-body text-center p-3">
              <div className="text-muted mb-2">
                <i className="fas fa-times-circle fa-2x"></i>
              </div>
              <h3 className="mb-1 fw-bold">{stats?.cancelled || '0'}</h3>
              <p className="text-muted mb-0 small">{t('admin.stats.cancelled')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-2">
          <div className="card border h-100">
            <div className="card-body text-center p-3">
              <div className="text-muted mb-2">
                <i className="fas fa-check-double fa-2x"></i>
              </div>
              <h3 className="mb-1 fw-bold">{stats?.completed || '0'}</h3>
              <p className="text-muted mb-0 small">{t('admin.stats.completed')}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-2">
          <div className="card border h-100">
            <div className="card-body text-center p-3">
              <div className="text-muted mb-2">
                <i className="fas fa-calendar-day fa-2x"></i>
              </div>
              <h3 className="mb-1 fw-bold">{stats?.today || '0'}</h3>
              <p className="text-muted mb-0 small">{t('admin.stats.today')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card border mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label small fw-semibold">{t('admin.filters.filterByStatus')}</label>
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">{t('admin.filters.all')}</option>
                <option value="pending">{t('admin.stats.pending')}</option>
                <option value="confirmed">{t('admin.stats.confirmed')}</option>
                <option value="cancelled">{t('admin.stats.cancelled')}</option>
                <option value="completed">{t('admin.stats.completed')}</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">{t('admin.filters.search')}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t('admin.filters.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-primary w-100" onClick={fetchData}>
                <i className="fas fa-sync-alt me-2"></i>{t('admin.filters.refresh')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <ReservationsTable
        reservations={filteredReservations}
        onViewDetails={handleViewDetails}
        onStatusUpdate={handleStatusUpdate}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Reservation Details Modal */}
      {showModal && selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={() => {
            setShowModal(false)
            setSelectedReservation(null)
          }}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}

