package com.medicare.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    private String firstName;
    private String lastName;
    private String specialization;
    private Integer experienceYears;
    private BigDecimal consultationFee;
    private String profileImageUrl;
    private String about;
    
    @Builder.Default
    private BigDecimal rating = new BigDecimal("5.0");
    
    @Builder.Default
    private Boolean isActive = true;
}
