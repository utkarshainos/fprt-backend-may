import "@babel/polyfill";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//Connect to database
require("./config/db");

var usersRouter = require("./routes/user.route").default;
var galleryRouter = require("./routes/image.route").default;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", usersRouter);
app.use("/gallery", galleryRouter);

module.exports = app;
