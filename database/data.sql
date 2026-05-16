USE medicare_db;

-- Insert Admins
INSERT INTO users (email, password, role) VALUES ('admin@medicare.com', '$2a$10$xyz123hashedpassword', 'ADMIN');

-- Insert Departments
INSERT INTO departments (name, description, icon) VALUES 
('Cardiology', 'Heart and blood vessel diseases', 'bi-heart-pulse'),
('Neurology', 'Disorders of the nervous system', 'bi-brain'),
('Pediatrics', 'Medical care of infants, children, and adolescents', 'bi-people'),
('Orthopedics', 'Conditions involving the musculoskeletal system', 'bi-person-walking'),
('General Medicine', 'Prevention, diagnosis, and treatment of adult diseases', 'bi-clipboard-pulse');

-- Insert Doctor Users
INSERT INTO users (email, password, role) VALUES 
('dr.smith@medicare.com', '$2a$10$xyz123hashedpassword', 'DOCTOR'),
('dr.johnson@medicare.com', '$2a$10$xyz123hashedpassword', 'DOCTOR');

-- Insert Doctors
INSERT INTO doctors (user_id, department_id, first_name, last_name, specialization, experience_years, consultation_fee, about) VALUES 
(2, 1, 'Sarah', 'Smith', 'Interventional Cardiology', 15, 150.00, 'Expert in heart failure and echocardiography.'),
(3, 2, 'Michael', 'Johnson', 'Clinical Neurology', 10, 120.00, 'Specializes in stroke management and epilepsy.');

-- Insert Patient Users
INSERT INTO users (email, password, role) VALUES 
('john.doe@gmail.com', '$2a$10$xyz123hashedpassword', 'PATIENT');

-- Insert Patients
INSERT INTO patients (user_id, first_name, last_name, date_of_birth, gender, blood_group, phone) VALUES 
(4, 'John', 'Doe', '1990-05-15', 'MALE', 'O+', '123-456-7890');

-- Insert Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, reason) VALUES 
(1, 1, '2026-06-01', '10:00:00', 'CONFIRMED', 'Routine checkup for blood pressure.'),
(1, 2, '2026-06-05', '14:30:00', 'PENDING', 'Migraine issues.');
