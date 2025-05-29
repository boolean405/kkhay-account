require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const reqMethodLog = require("./middlewares/reqMethodLog");
const credentials = require("./middlewares/credentials");
const corsOptions = require("./config/corsOptions");

const PictureDB = require("./models/pictureModel");


const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(reqMethodLog);
app.use(credentials);
app.use(cors(corsOptions));
app.use(fileUpload());

// Route
const userRoute = require("./routes/userRoute");

app.use("/api/user", userRoute);
app.get("/picture/:id", async (req, res) => {
  try {
    const pic = await PictureDB.findById(req.params.id);
    if (!pic) return res.status(404).send("Not found");

    res.set("Content-Type", pic.contentType);
    res.send(pic.data);
  } catch (err) {
    res.status(500).send("Error retrieving image");
  }
});


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
