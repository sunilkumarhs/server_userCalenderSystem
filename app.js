const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const googleAuthRoutes = require("./src/routes/googleAuth");
const eventMehtodRoutes = require("./src/routes/eventMethods");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const PORT = process.env.NODE_PORT || 8080;
const upload = multer({ dest: "uploads/" });
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use("/goggleInit", googleAuthRoutes);
app.use("/goggleEvent", eventMehtodRoutes);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.NODE_APP_MONGODB_URI_KEY)
  .then((result) => {
    app.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
  })
  .catch((err) => console.log(err));
