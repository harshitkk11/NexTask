require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json());

app.use(helmet());

app.disable('x-powered-by');

app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN_VALUE);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// userRoutes
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "Connected to db and Server is running on port",
        PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });