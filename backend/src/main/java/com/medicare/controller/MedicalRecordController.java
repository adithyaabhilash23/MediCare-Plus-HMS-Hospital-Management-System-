package com.medicare.controller;

import com.medicare.entity.MedicalRecord;
import com.medicare.entity.Patient;
import com.medicare.entity.Doctor;
import com.medicare.entity.Appointment;
import com.medicare.repository.MedicalRecordRepository;
import com.medicare.repository.PatientRepository;
import com.medicare.repository.DoctorRepository;
import com.medicare.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<MedicalRecord> getAllRecords() {
        return medicalRecordRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getRecordById(@PathVariable Long id) {
        return medicalRecordRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getPatientRecords(@PathVariable Long patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }

    @PostMapping
    public ResponseEntity<?> createRecord(@RequestBody Map<String, Object> payload) {
        Long patientId = Long.valueOf(payload.get("patientId").toString());
        Long doctorId = Long.valueOf(payload.get("doctorId").toString());
        
        Patient patient = patientRepository.findById(patientId).orElseThrow();
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
        
        MedicalRecord.MedicalRecordBuilder builder = MedicalRecord.builder()
                .patient(patient)
                .doctor(doctor)
                .diagnosis(payload.get("diagnosis").toString())
                .prescription(payload.get("prescription").toString());

        if (payload.containsKey("appointmentId") && payload.get("appointmentId") != null) {
            Long appId = Long.valueOf(payload.get("appointmentId").toString());
            Appointment appointment = appointmentRepository.findById(appId).orElse(null);
            builder.appointment(appointment);
        }

        return ResponseEntity.ok(medicalRecordRepository.save(builder.build()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateRecord(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return medicalRecordRepository.findById(id).map(record -> {
            record.setDiagnosis(payload.get("diagnosis"));
            record.setPrescription(payload.get("prescription"));
            return ResponseEntity.ok(medicalRecordRepository.save(record));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id) {
        return medicalRecordRepository.findById(id).map(record -> {
            medicalRecordRepository.delete(record);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
