// server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserModel = require("./models/invoice.jsx");
const path = require("path");
dotenv.config()

const app = express();
const connectionUrl = "mongodb+srv://111-aZ:<db_password>@cluster1.y8fehmu.mongodb.net/";

mongoose.connect(
  connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add middleware for JSON parsing
app.set("view engine", "ejs");

// Serve React files for the frontend
app.use(express.static(path.join(__dirname, "build")));

app.get("/home", (req, res) => {
  res.render("index");
});

app.post("/api/user", (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save((error, savedUser) => {
    if (error) throw error;
    res.json(savedUser);
  });
});

// Fallback to React for other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000, () => {
  console.log("Listening on port 9000");
});