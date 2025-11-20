import Link from 'next/link'
import VehicleCarousel from '@/components/VehicleCarousel'

export const metadata = {
  title: 'Our Fleet - Yimesgen Limousine Rent',
  description: 'Browse our luxury fleet of vehicles available for rent.',
}

export default function VehiclePage() {
  return (
    <>
      <div className="container-fluid bg-breadcrumb mb-5">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h4 className="text-white display-4 mb-4">Our Vehicles</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active text-primary">Vehicles</li>
          </ol>
        </div>
      </div>

      <VehicleCarousel />
    </>
  )
}

