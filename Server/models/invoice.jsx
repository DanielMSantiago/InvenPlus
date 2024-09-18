const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  poNum: {
    type: String,
    required: [true, "PO Number Needed"],
  },
  invoiceNum: {
    type: String,
    required: [true, "Distributor Invoice Needed"],
  },
  distributor: {
    type: String,
    required: [true, "Distributor Name Needed"],
  },
  branch: {
    type: String,
    required: [true, "Branch Location Needed"],
  },
  customerName: {
    type: String,
  },
  warranty: {
    type: Boolean,
    required: [true],
  },
  amount: {
    type: Number,
    required: [true, "Amount Ordered Needed"],
  },
  itemName: {
    type: String,
    required: [true, "Item Description Needed"],
  },
  modelNum: {
    type: String,
    required: [true, "Model Number Needed"],
  },
  serialNum: {
    type: String,
  },
  price: {
    type: String,
    required: [true, "Price Needed"],
  },
});

const InvoiceModel = mongoose.model("invoice", InvoiceSchema);

module.exports = InvoiceModel;
