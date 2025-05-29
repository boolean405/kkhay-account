# KKhay Account API

A RESTful API for managing user account built with **Node.js**, **Express.js** and **MongoDB**.

# Kkhay Account User API

API service hosted at [https://kkhay-account.onrender.com/api/user](https://kkhay-account.onrender.com/api/user)

### Available Endpoints

List the main API endpoints here.

## API Endpoints

| Method | Endpoint             | Description                         |
|--------|----------------------|-----------------------------------|
| POST   | `/signup`            | Register a new user                |
| POST   | `/signin`            | User login                        |
| GET    | `/refresh`           | Refresh authentication token      |
| POST   | `/signout`           | Logout user                      |
| GET    | `/profile`           | Get authenticated user profile    |
| PATCH  | `/profile`           | Update user profile               |
| DELETE | `/profile`           | Delete user account               |
| GET    | `/profile/picture`   | Get user's profile picture        |
| POST   | `/profile/picture`   | Upload or update profile picture  |


## Overview

Kkhay Account API provides endpoints to manage user accounts, authentication, and related features. This project is designed to be lightweight, fast, and easy to integrate with your applications.

## Base URL

## Features

- Create, read, update, and delete notes
- Search notes by keywords
- Pagination support for fetching notes
- Request validation with Joi schemas
- JWT token validation for authentication
- Middleware for error handling, CORS, and logging

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Joi (for validation)
- JSON Web Tokens (JWT)
- CORS

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) database (local or hosted)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/boolean405/kkhay-account.git
cd kkhay-account
