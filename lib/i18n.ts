// Internationalization (i18n) support

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'zh' | 'ja' | 'ru'

export const translations = {
  en: {
    // Admin Dashboard
    admin: {
      title: 'Admin Dashboard',
      manage: 'Manage Car Reservations',
      logout: 'Logout',
      stats: {
        total: 'Total Reservations',
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completed: 'Completed',
        today: 'Today',
      },
      filters: {
        all: 'All Reservations',
        filterByStatus: 'Filter by Status',
        search: 'Search',
        searchPlaceholder: 'Search by car, location, customer...',
        refresh: 'Refresh',
      },
      table: {
        id: 'ID',
        carType: 'Car Type',
        customer: 'Customer',
        pickUp: 'Pick Up',
        dropOff: 'Drop Off',
        dates: 'Dates',
        status: 'Status',
        actions: 'Actions',
        noReservations: 'No reservations found',
        viewDetails: 'View Details',
        delete: 'Delete',
      },
      modal: {
        title: 'Reservation Details',
        carInfo: 'Car Information',
        status: 'Status',
        pickUp: 'Pick Up',
        dropOff: 'Drop Off',
        customerInfo: 'Customer Information',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        notes: 'Notes',
        created: 'Created',
        lastUpdated: 'Last Updated',
        close: 'Close',
      },
      login: {
        title: 'Admin Login',
        subtitle: 'Car Rental Management System',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        loggingIn: 'Logging in...',
        invalidCredentials: 'Invalid credentials',
      },
    },
    // Booking Form
    booking: {
      title: 'CONTINUE CAR RESERVATION',
      selectCar: 'Select Your Car type',
      pickUp: 'Pick Up',
      dropOff: 'Drop Off',
      location: 'Enter a City or Airport',
      needDifferentLocation: 'Need a different drop-off location?',
      name: 'Your Name (Optional)',
      email: 'Your Email (Optional)',
      phone: 'Your Phone (Optional)',
      bookNow: 'Book Now',
      submitting: 'Submitting...',
      success: 'Reservation submitted successfully! We will contact you soon.',
      error: 'Failed to submit reservation. Please try again.',
    },
  },
  es: {
    admin: {
      title: 'Panel de Administración',
      manage: 'Gestionar Reservas de Coches',
      logout: 'Cerrar Sesión',
      stats: {
        total: 'Reservas Totales',
        pending: 'Pendientes',
        confirmed: 'Confirmadas',
        cancelled: 'Canceladas',
        completed: 'Completadas',
        today: 'Hoy',
      },
      filters: {
        all: 'Todas las Reservas',
        filterByStatus: 'Filtrar por Estado',
        search: 'Buscar',
        searchPlaceholder: 'Buscar por coche, ubicación, cliente...',
        refresh: 'Actualizar',
      },
    },
  },
  fr: {
    admin: {
      title: 'Tableau de Bord Administrateur',
      manage: 'Gérer les Réservations de Voitures',
      logout: 'Déconnexion',
      stats: {
        total: 'Réservations Totales',
        pending: 'En Attente',
        confirmed: 'Confirmées',
        cancelled: 'Annulées',
        completed: 'Terminées',
        today: "Aujourd'hui",
      },
    },
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang] || translations.en

  for (const k of keys) {
    value = value?.[k]
    if (!value) {
      // Fallback to English
      value = translations.en
      for (const k2 of keys) {
        value = value?.[k2]
      }
      break
    }
  }

  return value || key
}

// Language hook is in hooks/useLanguage.ts for client-side usage

