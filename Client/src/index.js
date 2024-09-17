import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const express = require("express")
const app = express()
const mongoose = require("mongoose")
var connectionUrl = "mongodb://localhost:27017/HVACInventory"

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err)) => {
  if (err) throw err
  console.log("Connected")
}

app.get("/home", (req, res) => {
  res.send("Hello")
})

const port = process.env.PORT || 4000
app.listen(port, ()=>{
  console.log(`Listening to port ${port}`)
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode >
    <BrowserRouter >
      <App />
    </BrowserRouter> 
  </React.StrictMode >
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();