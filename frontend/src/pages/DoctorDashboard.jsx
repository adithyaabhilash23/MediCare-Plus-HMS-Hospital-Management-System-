import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get(`/appointments/doctor/${user.id}`);
            setAppointments(res.data);
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Doctor Dashboard</h2>
                <div className="user-info">
                    <span>Welcome, Dr. {user.email}</span>
                    <button onClick={handleLogout} className="btn-outline small">Logout</button>
                </div>
            </header>
            <main className="dashboard-main">
                <section className="appointments-section card">
                    <h3>My Schedule</h3>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Patient</th>
                                    <th>Status</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(apt => (
                                    <tr key={apt.id}>
                                        <td>{apt.appointmentDate}</td>
                                        <td>{apt.appointmentTime}</td>
                                        <td>{apt.patient.firstName} {apt.patient.lastName}</td>
                                        <td><span className={`badge ${apt.status.toLowerCase()}`}>{apt.status}</span></td>
                                        <td>{apt.reason}</td>
                                        <td>
                                            <button className="btn-outline small">View Record</button>
                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && <tr><td colSpan="6">No appointments found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DoctorDashboard;
