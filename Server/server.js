// server.js
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/invoice");
const path = require("path");

const app = express();
const connectionUrl = "mongodb://localhost:27017/HVACInventory";

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