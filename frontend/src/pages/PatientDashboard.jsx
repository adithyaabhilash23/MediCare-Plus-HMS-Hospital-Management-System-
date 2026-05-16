import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [bookingData, setBookingData] = useState({ doctorId: '', appointmentDate: '', appointmentTime: '', reason: '' });
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
        fetchAppointments();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await api.get('/doctors');
            setDoctors(res.data);
            if(res.data.length > 0) setBookingData(prev => ({...prev, doctorId: res.data[0].id}));
        } catch (err) { console.error(err); }
    };

    const fetchAppointments = async () => {
        try {
            const res = await api.get(`/appointments/patient/${user.id}`);
            setAppointments(res.data);
        } catch (err) { console.error(err); }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        try {
            await api.post('/appointments', { ...bookingData, patientId: user.id });
            fetchAppointments();
            setBookingData({ ...bookingData, appointmentDate: '', appointmentTime: '', reason: '' });
            alert("Appointment booked successfully!");
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Patient Dashboard</h2>
                <div className="user-info">
                    <span>Welcome, {user.email}</span>
                    <button onClick={handleLogout} className="btn-outline small">Logout</button>
                </div>
            </header>
            <main className="dashboard-main">
                <section className="booking-section card">
                    <h3>Book Appointment</h3>
                    <form onSubmit={handleBook} className="inline-form">
                        <select value={bookingData.doctorId} onChange={e => setBookingData({...bookingData, doctorId: e.target.value})} required>
                            <option value="">Select Doctor</option>
                            {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.firstName} {d.lastName} - {d.specialization}</option>)}
                        </select>
                        <input type="date" value={bookingData.appointmentDate} onChange={e => setBookingData({...bookingData, appointmentDate: e.target.value})} required />
                        <input type="time" value={bookingData.appointmentTime} onChange={e => setBookingData({...bookingData, appointmentTime: e.target.value})} required />
                        <input type="text" placeholder="Reason" value={bookingData.reason} onChange={e => setBookingData({...bookingData, reason: e.target.value})} required />
                        <button type="submit" className="btn-primary">Book</button>
                    </form>
                </section>
                <section className="appointments-section card">
                    <h3>My Appointments</h3>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Doctor</th>
                                    <th>Status</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(apt => (
                                    <tr key={apt.id}>
                                        <td>{apt.appointmentDate}</td>
                                        <td>{apt.appointmentTime}</td>
                                        <td>Dr. {apt.doctor.firstName} {apt.doctor.lastName}</td>
                                        <td><span className={`badge ${apt.status.toLowerCase()}`}>{apt.status}</span></td>
                                        <td>{apt.reason}</td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && <tr><td colSpan="5">No appointments found.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PatientDashboard;
