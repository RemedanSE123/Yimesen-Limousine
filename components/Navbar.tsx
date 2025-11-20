'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path ? 'active' : ''
  }

  return (
    <div
      className={`container-fluid nav-bar sticky-top px-0 px-lg-4 py-2 py-lg-0 ${
        isSticky ? 'shadow-sm' : ''
      }`}
      style={{ top: isSticky ? '0px' : '-100px' }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link href="/" className="navbar-brand p-0">
            <h1 className="display-6 text-primary">
              <i className="fas fa-car-alt me-3"></i>Yimesgen
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarCollapse">
            <div className="navbar-nav mx-auto py-0">
              <Link href="/" className={`nav-item nav-link ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/about" className={`nav-item nav-link ${isActive('/about')}`}>
                About
              </Link>
              <Link href="/vehicle" className={`nav-item nav-link ${isActive('/vehicle')}`}>
                Fleet
              </Link>
              <Link href="/team" className={`nav-item nav-link ${isActive('/team')}`}>
                Team
              </Link>
              <Link href="/blog" className={`nav-item nav-link ${isActive('/blog')}`}>
                Blog
              </Link>
              <Link href="/contact" className={`nav-item nav-link ${isActive('/contact')}`}>
                Contact
              </Link>
            </div>
            <a
              href="https://liyonays.github.io/Kmem_Solution/index.html"
              className="btn btn-primary rounded-pill py-2 px-4"
            >
              Buy Pro Version
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}

