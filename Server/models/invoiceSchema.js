import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    PoNumber: {
        type: Number,
        required: true,
    },
    DistroInvoiceNum: {
        type: Number,
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
        required: true,
    },
    Warranty: {
        type: Boolean,
        required: true,
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
        required: true,
    },
    ItemPrice: {
        type: Number,
        required: true,
    }

})

export const Invoice = mongoose.model("Invoice", invoiceSchema)