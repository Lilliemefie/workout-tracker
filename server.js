// Dependencies
const express = require("express");
const logger = require("morgan"); // logs all request to the console
const mongoose = require("mongoose");


// Sets up Express App
const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// db Mongo
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useUnifiedTopology: true  });

//call first page (link for Fitness Tracker on Nav) > WORK
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  });

 // Routes
app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));



// Server starts listening 
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });