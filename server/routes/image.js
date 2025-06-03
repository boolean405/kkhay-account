const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/images/logo.png"));
});

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/images/verified.png"));
});

module.exports = router;
