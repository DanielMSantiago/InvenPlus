// server.js
const express = require("express");
const mongodb = require("mongodb")
const homepage = require('../../hvac-inventory-new/Client/src/Pages/homepage.jsx')
const UserModel = require("./models/invoice.jsx");
const path = require("path");
const app = express()

app.get("/", (req, res) => {
  res.render(homepage)
})

app.post()

app.listen(3000)