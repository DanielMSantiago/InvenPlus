import express from 'express';
import { Invoice } from '../models/invoiceSchema.js';

const router = express.Router();

//Send an entered invoice to the database
router.post("/", async (request, response) => {
    try {
        // Validate required fields
        const {
            PoNumber,
            DistroInvoiceNum,
            Distro,
            DistroBranch,
            OrderItems
        } = request.body;

        console.log("Request Body: ", request.body)
        console.log("Order Items: ", request.body.OrderItems)

        if (!PoNumber || !DistroInvoiceNum || !Distro || !DistroBranch ||
            !OrderItems) {
            return response.status(400).json({
                message: "Please send all required fields: Po Number, Invoice Number, Distributor, Distributor Branch, Warranty, Amount Order, Item Name, Item Model Number",
            });
        }

        // Create a new invoice object
        const newInvoice = new Invoice({
            PoNumber,
            DistroInvoiceNum,
            Distro,
            DistroBranch,
            CustName,
            OrderItems
        });

        // Save the invoice to the database
        const savedInvoice = await newInvoice.save();

        return response.status(201).json(savedInvoice);

    } catch (error) {
        console.error("Error saving invoice:", error.message);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

//get method for finding invoices
router.get('/', async (request, response) => {
    try {

        const invoices = await Invoice.find({});
        return response.status(200).json(invoices)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//get method for finding invoice by PO Number
router.get('/:PoNumber', async (request, response) => {
    try {

        const { PoNumber } = request.params
        const invoices = await Invoice.findOne({ PoNumber })

        return response.status(200).json(invoices)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Delete an invoice using PO Number
router.delete('/:PoNumber', async (request, response) => {
    try {
        const { PoNumber } = request.params;

        const result = await Invoice.findOneAndDelete({ PoNumber })

        if (!result) {
            return response.status(404).json({ message: "Invoice not found" })
        }

        return response.status(200).send({ message: 'Invoice deleted successfully' })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router