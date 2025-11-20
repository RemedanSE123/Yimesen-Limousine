import Link from 'next/link'

export default function Topbar() {
  return (
    <div className="container-fluid topbar bg-secondary d-none d-xl-block w-100">
      <div className="container">
        <div className="row gx-0 align-items-center" style={{ height: '45px' }}>
          <div className="col-lg-6 text-center text-lg-start mb-lg-0">
            <div className="d-flex flex-wrap">
              <a href="#" className="text-muted me-4">
                <i className="fas fa-map-marker-alt text-primary me-2"></i>Find A Location
              </a>
              <a href="tel:+01234567890" className="text-muted me-4">
                <i className="fas fa-phone-alt text-primary me-2"></i>+01234567890
              </a>
              <a href="mailto:example@gmail.com" className="text-muted me-0">
                <i className="fas fa-envelope text-primary me-2"></i>Example@gmail.com
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-end">
            <div className="d-flex align-items-center justify-content-end">
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="btn btn-light btn-sm-square rounded-circle me-0">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

