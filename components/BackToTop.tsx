'use client'

import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <a
      href="#"
      className="btn btn-secondary btn-lg-square rounded-circle back-to-top"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <i className="fa fa-arrow-up"></i>
    </a>
  )
}

