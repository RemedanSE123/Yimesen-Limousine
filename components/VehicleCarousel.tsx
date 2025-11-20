'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface Vehicle {
  id: number
  name: string
  image: string
  price: string
  rating: number
  seats: number
  transmission: string
  fuel: string
  year: number
  mileage: string
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: 'Mercedes Benz R3',
    image: '/img/car-1.png',
    price: '$99:00/Day',
    rating: 4.5,
    seats: 4,
    transmission: 'AT/MT',
    fuel: 'Petrol',
    year: 2015,
    mileage: '27K',
  },
  {
    id: 2,
    name: 'Toyota Corolla Cross',
    image: '/img/car-2.png',
    price: '$128:00/Day',
    rating: 3.5,
    seats: 4,
    transmission: 'AT/MT',
    fuel: 'Petrol',
    year: 2015,
    mileage: '27K',
  },
  {
    id: 3,
    name: 'Tesla Model S Plaid',
    image: '/img/car-3.png',
    price: '$170:00/Day',
    rating: 3.8,
    seats: 4,
    transmission: 'AT/MT',
    fuel: 'Petrol',
    year: 2015,
    mileage: '27K',
  },
  {
    id: 4,
    name: 'Hyundai Kona Electric',
    image: '/img/car-4.png',
    price: '$187:00/Day',
    rating: 4.8,
    seats: 4,
    transmission: 'AT/MT',
    fuel: 'Petrol',
    year: 2015,
    mileage: '27K',
  },
]

export default function VehicleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 576) {
        setVisibleCount(1)
      } else if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 992) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  const scrollPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const scrollNext = () => {
    const maxIndex = Math.max(0, vehicles.length - visibleCount)
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const prevBtnEnabled = currentIndex > 0
  const nextBtnEnabled = currentIndex < vehicles.length - visibleCount

  const visibleVehicles = vehicles.slice(currentIndex, currentIndex + visibleCount)

  return (
    <div className="container-fluid categories py-5">
      <div className="container">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
          <h1 className="display-5 text-capitalize mb-3">
            Our <span className="text-primary">Vehicles</span>
          </h1>
          <p className="mb-0">
            Our fleet features modern, stylish, and fully-equipped limousines, designed to give
            you a smooth and memorable journey. With professional, well-trained chauffeurs, you can
            relax and enjoy a first-class travel experience every time.
          </p>
        </div>
        <div className="categories-carousel position-relative">
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="d-flex flex-wrap gap-4 justify-content-center">
            {visibleVehicles.map((vehicle) => (
              <div key={vehicle.id} className="categories-item p-4" style={{ width: 'calc(33.333% - 1rem)', minWidth: '300px', flex: '0 0 auto' }}>
                <div className="categories-item-inner">
                  <div className="categories-img rounded-top">
                    <Image
                      src={vehicle.image}
                      className="img-fluid w-100 rounded-top"
                      alt={vehicle.name}
                      width={400}
                      height={250}
                    />
                  </div>
                  <div className="categories-content rounded-bottom p-4">
                    <h4>{vehicle.name}</h4>
                    <div className="categories-review mb-4">
                      <div className="me-3">{vehicle.rating} Review</div>
                      <div className="d-flex justify-content-center text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < Math.floor(vehicle.rating) ? '' : 'text-body'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="bg-white text-primary rounded-pill py-2 px-4 mb-0 d-inline-block">
                        {vehicle.price}
                      </h4>
                    </div>
                    <div className="row gy-2 gx-0 text-center mb-4">
                      <div className="col-4 border-end border-white">
                        <i className="fa fa-users text-dark"></i>{' '}
                        <span className="text-body ms-1">{vehicle.seats} Seat</span>
                      </div>
                      <div className="col-4 border-end border-white">
                        <i className="fa fa-car text-dark"></i>{' '}
                        <span className="text-body ms-1">{vehicle.transmission}</span>
                      </div>
                      <div className="col-4">
                        <i className="fa fa-gas-pump text-dark"></i>{' '}
                        <span className="text-body ms-1">{vehicle.fuel}</span>
                      </div>
                      <div className="col-4 border-end border-white">
                        <i className="fa fa-car text-dark"></i>{' '}
                        <span className="text-body ms-1">{vehicle.year}</span>
                      </div>
                      <div className="col-4 border-end border-white">
                        <i className="fa fa-cogs text-dark"></i>{' '}
                        <span className="text-body ms-1">AUTO</span>
                      </div>
                      <div className="col-4">
                        <i className="fa fa-road text-dark"></i>{' '}
                        <span className="text-body ms-1">{vehicle.mileage}</span>
                      </div>
                    </div>
                    <a href="#" className="btn btn-primary rounded-pill d-flex justify-content-center py-3">
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

