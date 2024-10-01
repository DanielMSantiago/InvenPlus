// models/invoice.js
const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  poNum: String,
  invoiceNum: String,
  distributor: String,
  branch: String,
  customerName: String,
  warranty: String,
  items: [
    {
      amount: String,
      itemName: String,
      modelNum: String,
      serialNum: String,
      price: String,
      received: Boolean,
    },
  ],
});

const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);

module.exports = InvoiceModel;
