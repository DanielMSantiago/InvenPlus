import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    AmountOrd: { type: String, required: true },
    ItemName: { type: String, required: true },
    ItemModel: { type: String, required: true },
    ItemSerial: { type: String, required: true },
    ItemPrice: { type: String, required: true },
    Received: { type: Boolean }
});

const invoiceSchema = new mongoose.Schema({
    PoNumber: { type: String, required: true },
    DistroInvoiceNum: { type: String, required: true },
    Distro: { type: String, required: true },
    DistroBranch: { type: String, required: true },
    CustName: { type: String },
    OrderItems: { type: [orderItemSchema], required: true }
});

export const Invoice = mongoose.model("Invoice", invoiceSchema)