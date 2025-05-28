require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const reqMethodLog = require("./middlewares/reqMethodLog");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(reqMethodLog);

// const allowedOrigins = ["http://localhost:4000", "https://www.google.com"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
// app.use(cors(corsOptions));

// Route
const userRoute = require("./routes/userRoute");

app.use("/api/users", userRoute);

// MongoDB Connection)
mongoose.connection.once("open", () => {
  console.log(`=> Success, MongoDB Connected.`);
  app.listen(port, () => {
    console.log(`=> Server running on port ${port}`);
  });
});

// Error Handler
app.use(notFoundHandler);
app.use(errorHandler);
