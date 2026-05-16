import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1>MediCare+</h1>
                <nav>
                    <Link to="/login" className="btn-outline">Login</Link>
                    <Link to="/register" className="btn-primary">Register</Link>
                </nav>
            </header>
            <main className="landing-main">
                <div className="hero-content">
                    <h2>Advanced Healthcare Management System</h2>
                    <p>Streamline your hospital operations, manage patient records securely, and schedule appointments effortlessly.</p>
                    <Link to="/register" className="btn-primary large">Get Started</Link>
                </div>
            </main>
        </div>
    );
};

export default Landing;
