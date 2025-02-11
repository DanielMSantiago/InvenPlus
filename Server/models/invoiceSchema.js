import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    PoNumber: {
        type: String,
        required: true,
    },
    DistroInvoiceNum: {
        type: String,
        required: true,
    },
    Distro: {
        type: String,
        required: true,
    },
    DistroBranch: {
        type: String,
        required: true,
    },
    CustName: {
        type: String,
    },

    AmountOrd: {
        type: Number,
        required: true,
    },
    ItemName: {
        type: String,
        required: true,
    },
    ItemModel: {
        type: String,
        required: true,
    },
    ItemSerial: {
        type: String,

    },
    ItemPrice: {
        type: Number,
        required: true,
    }

})

export const Invoice = mongoose.model("Invoice", invoiceSchema)