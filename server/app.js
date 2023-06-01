const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const mongoURI = process.env.MONGO_URL;
mongoose
  .connect(mongoURI)
  .then(() => console.log("DB Connetion Successfull"))
  .catch((err) => console.log(err.message));

app.use("/", indexRouter);

module.exports = app;
