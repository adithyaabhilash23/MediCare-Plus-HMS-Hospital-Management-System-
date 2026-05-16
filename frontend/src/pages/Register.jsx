import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', role: 'PATIENT', phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleBypass = () => {
        const dummyUser = {
            id: 1,
            email: 'guest@medicare.com',
            role: 'ROLE_PATIENT',
            token: 'dummy-token'
        };
        localStorage.setItem('user', JSON.stringify(dummyUser));
        navigate('/patient-dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-row">
                        <div className="form-group half">
                            <label>First Name</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group half">
                            <label>Last Name</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Register As</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="PATIENT">Patient</option>
                            <option value="DOCTOR">Doctor</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary full-width">Register</button>
                </form>
                <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button type="button" onClick={handleBypass} className="btn-outline full-width">Bypass Login</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
