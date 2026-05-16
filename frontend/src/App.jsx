import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import './App.css';

const PrivateRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/patient-dashboard" element={
                    <PrivateRoute role="ROLE_PATIENT"><PatientDashboard /></PrivateRoute>
                } />
                <Route path="/admin-dashboard" element={
                    <PrivateRoute role="ROLE_ADMIN"><AdminDashboard /></PrivateRoute>
                } />
                <Route path="/doctor-dashboard" element={
                    <PrivateRoute role="ROLE_DOCTOR"><DoctorDashboard /></PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
