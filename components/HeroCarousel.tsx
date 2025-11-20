'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import BookingForm from './BookingForm'

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = [
    {
      image: '/img/carousel-2.png',
      title: 'Get 15% off your rental Plan your trip now',
      subtitle: 'Treat yourself in USA',
    },
    {
      image: '/img/carousel-1.png',
      title: 'Get 15% off your rental! Choose Your Model',
      subtitle: 'Treat yourself in USA',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="header-carousel mb-5 position-relative" style={{ height: '700px', overflow: 'hidden' }}>
      {/* Carousel Slides - Only images change */}
      <div className="carousel slide position-absolute w-100 h-100" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          {slides.map((_, index) => (
            <li
              key={index}
              data-bs-target="#carouselId"
              data-bs-slide-to={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => goToSlide(index)}
              style={{ cursor: 'pointer' }}
            ></li>
          ))}
        </ol>
        <div className="carousel-inner h-100" role="listbox">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item h-100 ${activeIndex === index ? 'active' : ''}`}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Booking Form Overlay - Fixed, persists across slide changes */}
      <div 
        className="position-absolute w-100 h-100 d-flex align-items-center" 
        style={{ 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 10
        }}
      >
        <div className="container py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <BookingForm />
            </div>
            <div className="col-lg-6 d-none d-lg-flex">
              <div className="text-start">
                <h1 className="display-5 text-white mb-3 animate__animated animate__fadeInRight">
                  {slides[activeIndex].title}
                </h1>
                <p className="text-white fs-5 animate__animated animate__fadeInRight" style={{ animationDelay: '0.2s' }}>
                  {slides[activeIndex].subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

