# KKhay Account API

A secure and feature-rich RESTful API for managing user accounts, built using **Node.js**, **Express.js**, and **MongoDB**.

---

## 🌐 Live API

**Base URL:**  
[https://kkhay-account.onrender.com/api/user](https://kkhay-account.onrender.com/api/user)

---

## ✨ Email Verification

- On **signup**, users receive a verification email.
- The email includes a tokenized link valid for **10 minutes**.
- The account is only created after successful verification.
- Ensures authenticity and helps prevent spam or abuse.

---

## 📌 API Endpoints

| Method | Endpoint          | Description                              | Auth Required |
| ------ | ----------------- | ---------------------------------------- | ------------- |
| POST   | `/signup`         | Send email verification link             | ❌ No         |
| GET    | `/signupverify`   | Verify email and create user account     | ❌ No         |
| POST   | `/signin`         | Log in and receive tokens                | ❌ No         |
| POST   | `/signout`        | Log out and clear refresh token (cookie) | ✅ Yes        |
| GET    | `/refresh`        | Refresh access token via cookie          | ✅ Yes        |
| GET    | `/`               | Get current user profile                 | ✅ Yes        |
| PATCH  | `/changename`     | Change full name                         | ✅ Yes        |
| PATCH  | `/changeusername` | Change username                          | ✅ Yes        |
| PATCH  | `/changepassword` | Change password                          | ✅ Yes        |
| DELETE | `/deleteaccount`  | Permanently delete account               | ✅ Yes        |
| GET    | `/picture`        | Get profile picture                      | ✅ Yes        |
| POST   | `/picture`        | Upload or update profile picture         | ✅ Yes        |

---

## 🛡️ Rate Limiting

To protect the API from abuse and DoS attacks, requests are **rate-limited**:

- **Limit**: 100 requests per IP
- **Window**: 10 minutes
- **Response on limit exceed**:

````json
{
  "con": false,
  "msg": "Too many requests, please try again later!"
}

## 🛠️ Features

- ✅ **Email verification** before account creation
- 🔐 **JWT authentication** with access and refresh tokens
- 🔑 **Secure password hashing** using `bcrypt`
- 🖼️ **Profile picture upload** via `express-fileupload`
- 📦 **Full account CRUD** (create, read, update, delete)
- 🧹 **Input validation** using `Joi`
- 🧰 Middleware for:
  - CORS handling
  - Error handling
  - Cookie parsing
  - Request logging


---

## 🧱 Tech Stack

- **Node.js** – JavaScript runtime for building server-side applications
- **Express.js** – Minimal and flexible Node.js web application framework
- **MongoDB** + **Mongoose** – NoSQL database and elegant MongoDB object modeling
- **JWT (JSON Web Tokens)** – Authentication using access and refresh tokens
- **Nodemailer** – For sending email verification links
- **bcrypt** – Secure password hashing
- **Joi** – Data validation and schema enforcement
- **dotenv** – Load environment variables from `.env` files
- **express-fileupload** – Middleware for handling file uploads


---

## 📦 Installation

```bash
git clone https://github.com/boolean405/kkhay-account.git
cd kkhay-account
npm install
````

---

✅ Let me know if you'd like to:

- Add API response examples
- Include screenshots or architecture diagrams
- Add badge icons (e.g. GitHub stars, forks, license)

Happy coding!
