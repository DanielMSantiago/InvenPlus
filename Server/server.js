const express = require("express");
const path = require("path");
const mongodb = require("mongodb");
const UserModel = require("./models/invoice.jsx"); // assuming this is a backend model for MongoDB

const app = express();

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../../hvac-inventory-new/Client/build')));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route for handling invoices (example)
app.post("/api/invoice", async (req, res) => {
  try {
    const { data } = req.body; // Extract data from the request
    const newInvoice = new UserModel(data); // Assuming UserModel is a Mongoose model
    await newInvoice.save(); // Save the invoice to MongoDB
    res.status(201).json({ message: "Invoice saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving invoice" });
  }
});

// All other requests will serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../../hvac-inventory-new/Client/build/index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});