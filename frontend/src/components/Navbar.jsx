import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <HeartPulse className="me-2" size={32} color="#0d6efd" />
          MediCare<span className="text-dark">+</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#doctors">Doctors</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-custom">Login</Link>
            <Link to="/register" className="btn btn-primary-custom">Book Appointment</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
