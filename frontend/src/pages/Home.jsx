import React from 'react';
import { Activity, Calendar, FileText, Users, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center text-md-start">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary bg-opacity-10 text-primary mb-3 p-2 rounded-pill">
                #1 Healthcare Platform
              </span>
              <h1 className="hero-title">
                Smart Healthcare <br /> Management <span className="text-primary">Simplified</span>
              </h1>
              <p className="hero-subtitle">
                Experience seamless appointment booking, secure medical records, and AI-assisted healthcare workflows all in one platform.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/register" className="btn btn-primary-custom btn-lg">Book Appointment</Link>
                <Link to="/login" className="btn btn-outline-custom btn-lg">Patient Login</Link>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Healthcare Professional" 
                  className="img-fluid rounded-4 shadow-lg"
                />
                {/* Floating Card */}
                <div className="position-absolute bottom-0 start-0 bg-white p-3 rounded-4 shadow m-3 d-flex align-items-center gap-3">
                  <div className="bg-success rounded-circle p-2 text-white">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">24/7 Support</h6>
                    <small className="text-muted">Always here for you</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Our Premium Services</h2>
            <p className="text-muted max-w-500 mx-auto">Comprehensive healthcare solutions designed for your well-being.</p>
          </div>
          <div className="row g-4">
            {[
              { icon: <Calendar />, title: "Online Booking", desc: "Book appointments instantly without waiting in queues." },
              { icon: <FileText />, title: "Medical Records", desc: "Access your health history securely anytime, anywhere." },
              { icon: <Users />, title: "Expert Doctors", desc: "Consult with top specialists across various departments." }
            ].map((service, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="feature-card text-center">
                  <div className="icon-box mx-auto">{service.icon}</div>
                  <h4 className="fw-bold mb-3">{service.title}</h4>
                  <p className="text-muted">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section id="doctors" className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Meet Our Specialists</h2>
            <p className="text-muted">Highly qualified professionals dedicated to your health.</p>
          </div>
          <div className="row g-4">
            {[1, 2, 3].map((doc, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60`} 
                    alt="Doctor" 
                    className="card-img-top"
                    style={{height: '250px', objectFit: 'cover'}}
                  />
                  <div className="card-body p-4 text-center">
                    <h5 className="fw-bold mb-1">Dr. Sarah Smith</h5>
                    <p className="text-primary fw-medium mb-3">Cardiologist</p>
                    <div className="d-flex justify-content-center gap-2 mb-4">
                      <span className="badge bg-light text-dark border">15+ Yrs Exp</span>
                      <span className="badge bg-warning text-dark">★ 4.9</span>
                    </div>
                    <button className="btn btn-outline-primary w-100 rounded-pill">Book Appointment</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-white">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Get In Touch</h2>
              <p className="text-muted mb-5">Have questions? We're here to help you navigate your healthcare journey.</p>
              <div className="d-flex gap-3 mb-4">
                <div className="icon-box bg-light text-primary m-0"><MapPin /></div>
                <div>
                  <h5 className="fw-bold mb-1">Location</h5>
                  <p className="text-muted mb-0">123 Health Ave, Medical City, NY 10001</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div className="icon-box bg-light text-primary m-0"><Phone /></div>
                <div>
                  <h5 className="fw-bold mb-1">Phone</h5>
                  <p className="text-muted mb-0">+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="d-flex gap-3 mb-4">
                <div className="icon-box bg-light text-primary m-0"><Mail /></div>
                <div>
                  <h5 className="fw-bold mb-1">Email</h5>
                  <p className="text-muted mb-0">support@medicare.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                <h4 className="fw-bold mb-4">Send us a Message</h4>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="Your Name" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="Email Address" />
                  </div>
                  <div className="mb-4">
                    <textarea className="form-control form-control-lg bg-light border-0" rows="4" placeholder="Your Message"></textarea>
                  </div>
                  <button className="btn btn-primary-custom w-100">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-lg-4">
              <h4 className="fw-bold text-white mb-4 d-flex align-items-center gap-2">
                <Activity color="#0d6efd" /> MediCare+
              </h4>
              <p className="text-white-50">Providing world-class enterprise healthcare solutions and smart management systems for modern hospitals.</p>
            </div>
            <div className="col-lg-2 offset-lg-2">
              <h5 className="fw-bold mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#services" className="text-white-50 text-decoration-none">Services</a></li>
                <li className="mb-2"><a href="#doctors" className="text-white-50 text-decoration-none">Doctors</a></li>
                <li className="mb-2"><Link to="/login" className="text-white-50 text-decoration-none">Login</Link></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5 className="fw-bold mb-4">Working Hours</h5>
              <div className="d-flex align-items-center gap-2 text-white-50 mb-2">
                <Clock size={16} /> <span>Mon - Fri: 8:00 AM - 8:00 PM</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50">
                <Activity size={16} /> <span>Emergency: 24/7 Available</span>
              </div>
            </div>
          </div>
          <hr className="border-secondary my-4" />
          <div className="text-center text-white-50">
            &copy; {new Date().getFullYear()} MediCare+. All rights reserved. Designed for Enterprise Solutions.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
