import Link from 'next/link'
import BlogGrid from '@/components/BlogGrid'

export const metadata = {
  title: 'Blog & News - Yimesgen Limousine Rent',
  description: 'Read our latest blog posts and news about car rental services.',
}

export default function BlogPage() {
  return (
    <>
      <div className="container-fluid bg-breadcrumb mb-5">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h4 className="text-white display-4 mb-4">Our Blog & News</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active text-primary">Blog & News</li>
          </ol>
        </div>
      </div>

      <BlogGrid />
    </>
  )
}

