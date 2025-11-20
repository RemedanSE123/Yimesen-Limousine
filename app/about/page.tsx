import Image from 'next/image'
import Link from 'next/link'
import TeamGrid from '@/components/TeamGrid'

export const metadata = {
  title: 'About Us - Yimesgen Limousine Rent',
  description: 'Learn about Yimesgen Limousine Rent and our commitment to luxury transportation.',
}

export default function AboutPage() {
  return (
    <>
      <div className="container-fluid bg-breadcrumb mb-5">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h4 className="text-white display-4 mb-4">About Us</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active text-primary">About</li>
          </ol>
        </div>
      </div>

      <div className="container-fluid overflow-hidden about py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-6">
              <div className="about-item">
                <div className="pb-5">
                  <h1 className="display-5 text-capitalize">
                    {' '}
                    Yimesgen_Limousine Rent <span className="text-primary">About</span>
                  </h1>
                  <p className="mb-0">
                    business travel, airport transfer, or a night out in the city, we provide the
                    perfect ride tailored to your needs.
                  </p>
                </div>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="about-item-inner border p-4">
                      <div className="about-icon mb-4">
                        <Image
                          src="/img/about-icon-1.png"
                          className="img-fluid w-50 h-50"
                          alt="Icon"
                          width={90}
                          height={90}
                        />
                      </div>
                      <h5 className="mb-3">Our Vision</h5>
                      <p className="mb-0">Choose comfort. Choose elegance. Choose reliability.</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-item-inner border p-4">
                      <div className="about-icon mb-4">
                        <Image
                          src="/img/about-icon-2.png"
                          className="img-fluid h-50 w-50"
                          alt="Icon"
                          width={90}
                          height={90}
                        />
                      </div>
                      <h5 className="mb-3">Our Mision</h5>
                      <p className="mb-0">Choose comfort. Choose elegance. Choose reliability.</p>
                    </div>
                  </div>
                </div>
                <p className="text-item my-4">
                  prioritize safety, punctuality, and customer satisfaction, ensuring your ride
                  arrives on time and meets the highest standards.
                </p>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="text-center rounded bg-secondary p-4">
                      <h1 className="display-6 text-white">17</h1>
                      <h5 className="text-light mb-0">Years Of Experience</h5>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="rounded">
                      <p className="mb-2">
                        <i className="fa fa-check-circle text-primary me-1"></i> Morbi tristique
                        senectus
                      </p>
                      <p className="mb-2">
                        <i className="fa fa-check-circle text-primary me-1"></i> A scelerisque purus
                      </p>
                      <p className="mb-2">
                        <i className="fa fa-check-circle text-primary me-1"></i> Dictumst vestibulum
                      </p>
                      <p className="mb-0">
                        <i className="fa fa-check-circle text-primary me-1"></i> dio aenean sed
                        adipiscing
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-5 d-flex align-items-center">
                    <a href="#" className="btn btn-primary rounded py-3 px-5">
                      More About Us
                    </a>
                  </div>
                  <div className="col-lg-7">
                    <div className="d-flex align-items-center">
                      <Image
                        src="/img/attachment-img.jpg"
                        className="img-fluid rounded-circle border border-4 border-secondary"
                        style={{ width: '100px', height: '100px' }}
                        alt="Image"
                        width={100}
                        height={100}
                      />
                      <div className="ms-4">
                        <h4>William Burgess</h4>
                        <p className="mb-0">Carveo Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-img">
                <div className="img-1">
                  <Image
                    src="/img/dd.jpg"
                    className="img-fluid rounded h-100 w-100"
                    alt=""
                    width={800}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TeamGrid />
    </>
  )
}

