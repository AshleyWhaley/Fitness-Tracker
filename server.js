// Dependencies
require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Setting up port
const PORT = process.env.PORT || 3000;
const app = express();
app.use(logger("dev"));

// Parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Heroku deployed db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/young-sea", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

//Routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

//Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});