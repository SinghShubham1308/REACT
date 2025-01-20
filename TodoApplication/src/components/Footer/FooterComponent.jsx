import React from 'react'
import { Link } from 'react-router-dom'

export const FooterComponent = () => {
  return (
    <footer className="FooterComponent row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    <div className="col mb-3">
      <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
      </a>
      <p className="text-body-secondary">© 2024</p>
    </div>

    <div className="col mb-3">

    </div>

    <div className="col mb-3">
      <h5>Section</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Home</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Features</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Pricing</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">FAQs</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">About</Link></li>
      </ul>
    </div>

    <div className="col mb-3">
      <h5>Section</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Home</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Features</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">Pricing</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">FAQs</Link></li>
        <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-body-secondary">About</Link></li>
      </ul>
    </div>

    <div className="col mb-3">
      <h5>Section</h5>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>
  </footer>
  )
}
