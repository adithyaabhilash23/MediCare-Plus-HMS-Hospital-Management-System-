# MediCare+ : Smart Hospital Appointment & Patient Management System

MediCare+ is a complete, production-quality full-stack web application designed for enterprise healthcare management. This project serves as an excellent demonstration for Java Full Stack Developer interviews, showcasing enterprise architecture, database relationships, REST APIs, and a modern React UI.

## 🌟 Features

- **Role-Based Access Control**: Separate dashboards and functionalities for Admin, Doctor, and Patient.
- **Patient Portal**: Appointment booking, medical records tracking, and profile management.
- **Doctor Portal**: Schedule management, patient assignments, and consultation notes.
- **Admin Dashboard**: Analytics, user management, appointment tracking, and system configuration.
- **Modern UI/UX**: Built with React, Vite, Bootstrap 5, and custom CSS for a premium SaaS feel.
- **Robust Backend**: Spring Boot REST APIs with Spring Data JPA and Hibernate.
- **Relational Database**: Well-designed MySQL schema with proper normalization, foreign keys, and cascading rules.

## 🛠 Tech Stack

### Frontend
- **React (Vite)**
- **Bootstrap 5** & Vanilla CSS
- **React Router DOM**
- **Lucide React** (Icons)
- **Axios** (HTTP Client)

### Backend
- **Java 17+**
- **Spring Boot 3.2+**
- **Spring Data JPA & Hibernate**
- **Spring Security & JWT** (Authentication)
- **Maven**

### Database
- **MySQL 8.0+**

## 📂 Project Structure

```
c:\Users\VICTUS\Desktop\dbms
│
├── frontend/                # React Vite Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page views (Home, Login, Dashboards)
│   │   ├── App.jsx          # Router configuration
│   │   ├── index.css        # Premium custom CSS styling
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Spring Boot Application
│   ├── src/main/java/com/medicare
│   │   ├── config/          # Security, CORS configurations
│   │   ├── controller/      # REST API Controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── exception/       # Global Exception Handlers
│   │   ├── model/           # JPA Entities (User, Doctor, Patient, etc.)
│   │   ├── repository/      # Spring Data JPA Repositories
│   │   └── service/         # Business Logic Services
│   ├── src/main/resources
│   │   └── application.properties # DB & App configurations
│   └── pom.xml
│
└── database/                # SQL Scripts
    ├── schema.sql           # Database schema creation scripts
    └── data.sql             # Dummy data for testing
```

## 🚀 Setup Instructions

### 1. Database Setup
1. Open MySQL Workbench or Command Line.
2. Run the scripts found in the `database` folder:
   - First, execute `schema.sql` to create tables.
   - Second, execute `data.sql` to populate the database with mock data.

### 2. Backend Setup
1. Navigate to the `backend` folder.
2. Update the database credentials in `backend/src/main/resources/application.properties` if your MySQL username/password differs from `root/root`.
3. Open the project in IntelliJ IDEA or Eclipse.
4. Run `MedicareApplication.java` as a Spring Boot application.
5. The backend will start on `http://localhost:8080`.

### 3. Frontend Setup
1. Open a terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:3000`.

## 🧪 Testing Credentials
- **Admin**: `admin@medicare.com` / `password` (Assuming basic dummy routing implemented in frontend)
- **Patient**: `john.doe@gmail.com` / `password`
- **Doctor**: `dr.smith@medicare.com` / `password`

## 🏗 Database Schema Highlights
- `users`: Base table for authentication and roles.
- `doctors` & `patients`: Linked to `users` via one-to-one mapping.
- `appointments`: Tracks booking lifecycle, linked to doctor and patient.
- `medical_records`: Stores consultation outputs.
- `departments`: Categorizes specializations.

## 👨‍💻 Developed For
Cognizant Digital Nurture (DN) 5.0, Infosys, TCS, Accenture, and other enterprise Java FSE interviews.
