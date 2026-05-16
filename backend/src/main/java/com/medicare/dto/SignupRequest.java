package com.medicare.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String role; // ADMIN, DOCTOR, PATIENT

    // Common info
    private String firstName;
    private String lastName;

    // For Doctor
    private Long departmentId;
    private String specialization;

    // For Patient
    private String phone;
}
