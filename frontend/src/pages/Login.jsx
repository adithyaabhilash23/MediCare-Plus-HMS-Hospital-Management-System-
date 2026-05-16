import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(response.data));
            
            const role = response.data.role;
            if (role === 'ROLE_ADMIN') navigate('/admin-dashboard');
            else if (role === 'ROLE_DOCTOR') navigate('/doctor-dashboard');
            else navigate('/patient-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
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
                <h2>Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary full-width">Login</button>
                </form>
                <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button type="button" onClick={handleBypass} className="btn-outline full-width">Bypass Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
