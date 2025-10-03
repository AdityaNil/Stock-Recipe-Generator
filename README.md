# Stock Recipe Generator

A full-stack web application that generates recipes based on stock ingredients. Users can **sign up, log in**, and interact with the app securely using **JWT authentication**. User data is stored in **MongoDB Atlas**, and the backend is built with **Spring Boot** while the frontend uses **React**.

---

## Features

- User **Signup** and **Login** with **JWT authentication**
- Recipes can be generated based on available ingredients
- Secure endpoints: only authenticated users can access recipe generation
- Frontend displays recipes and user information
- Persistent storage of users in **MongoDB Atlas**
- Minimal, easy-to-use React frontend

---

## Technologies Used

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT (io.jsonwebtoken)
- Spring Data MongoDB
- MongoDB Atlas

### Frontend
- ReactJS
- Axios (for API calls)
- React Router (for routing)
- LocalStorage (for storing JWT tokens)

---

## Project Structure

Stock Recipe Generator/
├─ SpringAI/ # Spring Boot backend
│ ├─ src/main/java/com/spring/SpringAI/
│ │ ├─ controller/ # REST controllers (Auth, Recipe)
│ │ ├─ model/ # MongoDB models (User)
│ │ ├─ repository/ # Repositories
│ │ ├─ security/ # JWT & Spring Security config
│ │ ├─ service/ # Custom UserDetailsService
│ │ └─ SpringAiApplication.java
│ └─ resources/
│ └─ application.properties
└─ frontend/spring/ # React frontend
├─ src/
│ ├─ AuthService.js
│ ├─ Login.jsx
│ ├─ Signup.jsx
│ └─ App.js
└─ package.json
