package com.medicare.config;

import com.medicare.entity.Department;
import com.medicare.entity.Doctor;
import com.medicare.entity.Role;
import com.medicare.entity.User;
import com.medicare.repository.DepartmentRepository;
import com.medicare.repository.DoctorRepository;
import com.medicare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private com.medicare.repository.PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (doctorRepository.count() == 0) {
            System.out.println("Seeding default departments and doctors...");

            // 1. Create Default Departments
            Department cardiology = departmentRepository.save(new Department(null, "Cardiology", "Heart related treatments", "heart-icon"));
            Department neurology = departmentRepository.save(new Department(null, "Neurology", "Brain and nervous system", "brain-icon"));
            Department orthopedics = departmentRepository.save(new Department(null, "Orthopedics", "Bones and joints", "bone-icon"));
            Department pediatrics = departmentRepository.save(new Department(null, "Pediatrics", "Child care", "child-icon"));
            Department general = departmentRepository.save(new Department(null, "General Medicine", "General health issues", "stethoscope-icon"));

            // 2. Define 10 Doctors
            List<DoctorData> doctorDataList = Arrays.asList(
                    new DoctorData("John", "Doe", "dr.john@medicare.com", "Cardiologist", cardiology, 15),
                    new DoctorData("Sarah", "Smith", "dr.sarah@medicare.com", "Neurologist", neurology, 10),
                    new DoctorData("Michael", "Johnson", "dr.michael@medicare.com", "Orthopedic Surgeon", orthopedics, 12),
                    new DoctorData("Emily", "Davis", "dr.emily@medicare.com", "Pediatrician", pediatrics, 8),
                    new DoctorData("James", "Wilson", "dr.james@medicare.com", "General Physician", general, 20),
                    new DoctorData("Olivia", "Brown", "dr.olivia@medicare.com", "Cardiologist", cardiology, 14),
                    new DoctorData("William", "Taylor", "dr.william@medicare.com", "Neurologist", neurology, 9),
                    new DoctorData("Sophia", "Anderson", "dr.sophia@medicare.com", "Orthopedic Surgeon", orthopedics, 11),
                    new DoctorData("Alexander", "Thomas", "dr.alexander@medicare.com", "Pediatrician", pediatrics, 7),
                    new DoctorData("Isabella", "Jackson", "dr.isabella@medicare.com", "General Physician", general, 18)
            );

            // 3. Save Users and Doctors
            String defaultPassword = passwordEncoder.encode("doctor123");

            for (DoctorData data : doctorDataList) {
                if (!userRepository.existsByEmail(data.email)) {
                    User user = User.builder()
                            .email(data.email)
                            .password(defaultPassword)
                            .role(Role.DOCTOR)
                            .build();
                    user = userRepository.save(user);

                    Doctor doctor = Doctor.builder()
                            .user(user)
                            .department(data.department)
                            .firstName(data.firstName)
                            .lastName(data.lastName)
                            .specialization(data.specialization)
                            .experienceYears(data.experienceYears)
                            .consultationFee(new BigDecimal("100.00"))
                            .rating(new BigDecimal("5.0"))
                            .isActive(true)
                            .build();
                    
                    doctorRepository.save(doctor);
                }
            }
            System.out.println("10 default doctors seeded successfully.");

            // Seed a dummy patient for bypass
            if (!userRepository.existsByEmail("guest@medicare.com")) {
                User guestUser = User.builder()
                        .email("guest@medicare.com")
                        .password(defaultPassword)
                        .role(Role.PATIENT)
                        .build();
                guestUser = userRepository.save(guestUser);

                com.medicare.entity.Patient guestPatient = com.medicare.entity.Patient.builder()
                        .user(guestUser)
                        .firstName("Guest")
                        .lastName("User")
                        .phone("0000000000")
                        .build();
                
                patientRepository.save(guestPatient);
                System.out.println("Guest patient seeded successfully.");
            }
        }
    }

    private static class DoctorData {
        String firstName;
        String lastName;
        String email;
        String specialization;
        Department department;
        int experienceYears;

        public DoctorData(String firstName, String lastName, String email, String specialization, Department department, int experienceYears) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.specialization = specialization;
            this.department = department;
            this.experienceYears = experienceYears;
        }
    }
}
