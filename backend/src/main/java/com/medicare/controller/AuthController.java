package com.medicare.controller;

import com.medicare.dto.JwtResponse;
import com.medicare.dto.LoginRequest;
import com.medicare.dto.MessageResponse;
import com.medicare.dto.SignupRequest;
import com.medicare.entity.*;
import com.medicare.repository.*;
import com.medicare.security.JwtUtils;
import com.medicare.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    DoctorRepository doctorRepository;
    
    @Autowired
    PatientRepository patientRepository;
    
    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                role));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        Role roleEnum = Role.valueOf(signUpRequest.getRole());
        
        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .role(roleEnum)
                .build();
                
        userRepository.save(user);

        if (roleEnum == Role.DOCTOR) {
            Department dept = departmentRepository.findById(signUpRequest.getDepartmentId())
                    .orElseGet(() -> {
                        Department newDept = new Department();
                        newDept.setName("General");
                        return departmentRepository.save(newDept);
                    });
            Doctor doctor = Doctor.builder()
                    .user(user)
                    .firstName(signUpRequest.getFirstName())
                    .lastName(signUpRequest.getLastName())
                    .specialization(signUpRequest.getSpecialization())
                    .department(dept)
                    .build();
            doctorRepository.save(doctor);
        } else if (roleEnum == Role.PATIENT) {
            Patient patient = Patient.builder()
                    .user(user)
                    .firstName(signUpRequest.getFirstName())
                    .lastName(signUpRequest.getLastName())
                    .phone(signUpRequest.getPhone())
                    .build();
            patientRepository.save(patient);
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
