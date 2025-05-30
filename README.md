# KKhay Account API

A secure and feature-rich RESTful API for managing user accounts, built using **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌐 Live API

**Base URL:**  
[https://kkhay-account.onrender.com/api/user](https://kkhay-account.onrender.com/api/user)

---

## ✨ Email Verification

- On **signup**, a verification email is sent.
- The user must verify via a tokenized link.
- The token is valid for **10 minutes**.
- This helps ensure authenticity and prevent spam.

---

## 📌 API Endpoints

| Method | Endpoint                  | Description                                      | Auth Required |
|--------|---------------------------|--------------------------------------------------|---------------|
| POST   | `/signup`                 | Send email verification link                     | No            |
| GET    | `/signupverify`          | Verify email and create user account             | No            |
| POST   | `/signin`                 | Login and receive tokens                         | No            |
| POST   | `/signout`                | Logout and clear refresh token                   | Yes (cookie)  |
| GET    | `/refresh`                | Get new access token via refresh token           | Yes (cookie)  |
| GET    | `/`                       | Get authenticated user's profile                 | Yes (token)   |
| PATCH  | `/changename`            | Change user's full name                          | Yes (token)   |
| PATCH  | `/changeusername`        | Change user's username                           | Yes (token)   |
| PATCH  | `/changepassword`        | Change user's password                           | Yes (token)   |
| DELETE | `/deleteaccount`         | Permanently delete user account                  | Yes (token)   |
| GET    | `/picture`               | Get user's profile picture                       | Yes (token)   |
| POST   | `/picture`               | Upload/update user's profile picture             | Yes (token)   |

---

## 🛠️ Features

- **Email verification** before account creation
- **JWT-based auth** (access and refresh tokens)
- **Secure password hashing** with bcrypt
- **Profile picture support**
- **Full CRUD** on account data
- **Schema validation** with Joi
- Middleware for **error handling**, **CORS**, **cookie parsing**, and **request logging**

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Tokens)**
- **Nodemailer**
- **Joi** (data validation)
- **dotenv**
- **express-fileupload**

---

## 📦 Installation

```bash
git clone https://github.com/boolean405/kkhay-account.git
cd kkhay-account
npm install
