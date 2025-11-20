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
    <div className="header-carousel mb-5">
      <div className="carousel slide" data-bs-ride="carousel">
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
        <div className="carousel-inner" role="listbox">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '700px',
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
              <div className="carousel-caption">
                <div className="container py-4">
                  <div className="row g-5">
                    <div className="col-lg-6">
                      <BookingForm />
                    </div>
                    <div className="col-lg-6 d-none d-lg-flex">
                      <div className="text-start">
                        <h1 className="display-5 text-white">{slide.title}</h1>
                        <p>{slide.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

