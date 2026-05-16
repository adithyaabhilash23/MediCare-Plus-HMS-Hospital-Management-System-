import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [docsRes, patsRes] = await Promise.all([
                api.get('/doctors'),
                api.get('/patients')
            ]);
            setDoctors(docsRes.data);
            setPatients(patsRes.data);
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <div className="user-info">
                    <span>Welcome, Admin {user.email}</span>
                    <button onClick={handleLogout} className="btn-outline small">Logout</button>
                </div>
            </header>
            <main className="dashboard-main">
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Total Doctors</h3>
                        <p className="stat-value">{doctors.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Patients</h3>
                        <p className="stat-value">{patients.length}</p>
                    </div>
                </div>
                <section className="doctors-section card mt-4">
                    <h3>Doctor Directory</h3>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Specialization</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map(d => (
                                    <tr key={d.id}>
                                        <td>Dr. {d.firstName} {d.lastName}</td>
                                        <td>{d.specialization}</td>
                                        <td>{d.isActive ? 'Active' : 'Inactive'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
