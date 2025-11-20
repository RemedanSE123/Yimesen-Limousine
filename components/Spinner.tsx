'use client'

import { useEffect, useState } from 'react'

export default function Spinner() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      id="spinner"
      className={`bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center ${
        show ? 'show' : ''
      }`}
    >
      <div
        className="spinner-border text-primary"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

