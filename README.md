# KKhay Account API

A RESTful API for managing user accounts, built with **Node.js**, **Express.js**, and **MongoDB**.

## 🌐 Live API

**Base URL:**  
[https://kkhay-account.onrender.com/api/user](https://kkhay-account.onrender.com/api/user)

---

## ✨ New Feature: Email Verification

Before a user account is created, the email must be verified.

- A verification email is sent on signup.
- The user must click the link to complete account creation.
- The token is valid for 10 minutes.
- Prevents spam and ensures real users.

---

## 📌 API Endpoints

| Method | Endpoint           | Description                                 |
| ------ | ------------------ | ------------------------------------------- |
| POST   | `/signup`          | Request email verification for registration |
| GET    | `/verify`          | Verify email and create user account        |
| POST   | `/signin`          | User login                                  |
| GET    | `/refresh`         | Refresh authentication token                |
| POST   | `/signout`         | Logout user                                 |
| GET    | `/profile`         | Get authenticated user profile              |
| PATCH  | `/profile`         | Update user profile                         |
| DELETE | `/profile`         | Delete user account                         |
| GET    | `/profile/picture` | Get user's profile picture                  |
| POST   | `/profile/picture` | Upload or update profile picture            |

---

## 🧭 Overview

The KKhay Account API provides endpoints to manage user accounts, authentication, email verification, and profile management. Built to be lightweight, secure, and easy to integrate into client applications.

---

## 🛠️ Features

- Email verification via tokenized email link
- JWT-based authentication (access & refresh tokens)
- Secure password hashing
- Profile and profile picture management
- Request validation using Joi
- Robust error handling
- CORS and logging middleware

---

## 🧱 Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Nodemailer
- Joi (input validation)
- CORS
- dotenv

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) (local or hosted)
- An email account with app password (e.g., Gmail with App Password)

---

## 🚀 Installation

```bash
git clone https://github.com/boolean405/kkhay-account.git
cd kkhay-account
npm install
```
