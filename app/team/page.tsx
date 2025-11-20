import Link from 'next/link'
import TeamGrid from '@/components/TeamGrid'

export const metadata = {
  title: 'Our Team - Yimesgen Limousine Rent',
  description: 'Meet our professional customer support team.',
}

export default function TeamPage() {
  return (
    <>
      <div className="container-fluid bg-breadcrumb mb-5">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h4 className="text-white display-4 mb-4">Our Team</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active text-primary">Team</li>
          </ol>
        </div>
      </div>

      <TeamGrid />
    </>
  )
}

