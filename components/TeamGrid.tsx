'use client'

import Image from 'next/image'

const teamMembers = [
  {
    id: 1,
    name: 'MARTIN DOE',
    position: 'Profession',
    image: '/img/blog-3.png',
  },
  {
    id: 2,
    name: 'MARTIN DOE',
    position: 'Profession',
    image: '/img/blog-2.png',
  },
  {
    id: 3,
    name: 'MARTIN DOE',
    position: 'Profession',
    image: '/img/blog-2.png',
  },
  {
    id: 4,
    name: 'MARTIN DOE',
    position: 'Profession',
    image: '/img/bg-1.png',
  },
]

export default function TeamGrid() {
  return (
    <div className="container-fluid team py-5">
      <div className="container">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
          <h1 className="display-5 text-capitalize mb-3">
            Customer<span className="text-primary"> Suport</span> Center
          </h1>
          <p className="mb-0">
            Our fleet features modern, stylish, and fully-equipped limousines, designed to give
            you a smooth and memorable journey. With professional, well-trained chauffeurs, you can
            relax and enjoy a first-class travel experience every time.
          </p>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="col-md-6 col-lg-6 col-xl-3">
              <div className="team-item p-4 pt-0">
                <div className="team-img">
                  <Image
                    src={member.image}
                    className="img-fluid rounded w-100"
                    alt="Image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="team-content pt-4">
                  <h4>{member.name}</h4>
                  <p>{member.position}</p>
                  <div className="team-icon d-flex justify-content-center">
                    <a
                      className="btn btn-square btn-light rounded-circle mx-1"
                      href="#"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      className="btn btn-square btn-light rounded-circle mx-1"
                      href="#"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      className="btn btn-square btn-light rounded-circle mx-1"
                      href="#"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      className="btn btn-square btn-light rounded-circle mx-1"
                      href="#"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
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

