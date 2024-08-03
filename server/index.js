require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const helmet = require('helmet')
const Routes = require('./routes/Routes')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const PORT = process.env.PORT;

const app = express();

app.use(cors({ credentials: true, origin: process.env.ORIGIN_VALUE }))

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.disable('x-powered-by');

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// userRoutes
app.use("/api", Routes);

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