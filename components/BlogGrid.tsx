'use client'

import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'Rental Cars how to check driving fines?',
    date: '30 Dec 2025',
    author: 'Martin.C',
    comments: 6,
    image: '/img/blog-2.png',
    excerpt:
      "Experience luxury, comfort, and exceptional service with our premium Limousine Rental. Whether you're planning a special event, business travel, airport transfer, or a night out in the city, we provide the perfect ride tailored to your needs.",
  },
  {
    id: 2,
    title: 'Rental cost of sport and other cars',
    date: '25 Dec 2025',
    author: 'Martin.C',
    comments: 6,
    image: '/img/blog-2.png',
    excerpt:
      "Experience luxury, comfort, and exceptional service with our premium Limousine Rental. Whether you're planning a special event, business travel, airport transfer, or a night out in the city, we provide the perfect ride tailored to your needs.",
  },
  {
    id: 3,
    title: 'Document required for car rental',
    date: '27 Dec 2025',
    author: 'Martin.C',
    comments: 6,
    image: '/img/blog-3.png',
    excerpt:
      "Experience luxury, comfort, and exceptional service with our premium Limousine Rental. Whether you're planning a special event, business travel, airport transfer, or a night out in the city, we provide the perfect ride tailored to your needs.",
  },
]

export default function BlogGrid() {
  return (
    <div className="container-fluid blog py-5">
      <div className="container">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
          <h1 className="display-5 text-capitalize mb-3">
            {' '}
            Yimesgen_Limousine Rent<span className="text-primary"> Blog & News</span>
          </h1>
          <p className="mb-0">
            Experience luxury, comfort, and exceptional service with our premium Limousine Rental.
            Whether you&apos;re planning a special event, business travel, airport transfer, or a night
            out in the city, we provide the perfect ride tailored to your needs.
          </p>
        </div>
        <div className="row g-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-4">
              <div className="blog-item">
                <div className="blog-img">
                  <Image
                    src={post.image}
                    className="img-fluid rounded-top w-100"
                    alt="Image"
                    width={400}
                    height={250}
                  />
                </div>
                <div className="blog-content rounded-bottom p-4">
                  <div className="blog-date">{post.date}</div>
                  <div className="blog-comment my-3">
                    <div className="small">
                      <span className="fa fa-user text-primary"></span>
                      <span className="ms-2">{post.author}</span>
                    </div>
                    <div className="small">
                      <span className="fa fa-comment-alt text-primary"></span>
                      <span className="ms-2">{post.comments} Comments</span>
                    </div>
                  </div>
                  <Link href="#" className="h4 d-block mb-3">
                    {post.title}
                  </Link>
                  <p className="mb-3">{post.excerpt}</p>
                  <Link href="#" className="">
                    Read More <i className="fa fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

