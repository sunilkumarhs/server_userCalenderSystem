const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const googleAuthRoutes = require("./src/routes/googleAuth");

const app = express();
const PORT = process.env.NODE_PORT || 8080;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/google", googleAuthRoutes);

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
