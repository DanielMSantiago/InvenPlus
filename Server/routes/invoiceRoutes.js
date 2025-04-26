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
            CustName,
            OrderItems
        } = request.body;

        console.log("Request Body: ", request.body);

        if (!PoNumber || !DistroInvoiceNum || !Distro || !DistroBranch || !OrderItems) {
            return response.status(400).json({
                message: "Please send all required fields: Po Number, Invoice Number, Distributor, Distributor Branch, Warranty, Amount Order, Item Name, Item Model Number",
            });
        }

        // Validate duplicate PO Number BEFORE saving
        const existingInvoiceByPo = await Invoice.findOne({ PoNumber });

        if (existingInvoiceByPo) {
            return response.status(400).json({ message: "Found duplicate PO Number" });
        }

        const existingInvoiceByInvoiceNum = await Invoice.findOne({ DistroInvoiceNum })

        if (existingInvoiceByInvoiceNum) {
            return response.status(400).json({ message: "Found Duplicate Invoice Number" })
        }

        // Create and save the new invoice
        const newInvoice = new Invoice({
            PoNumber,
            DistroInvoiceNum,
            Distro,
            DistroBranch,
            CustName,
            OrderItems
        });

        const savedInvoice = await newInvoice.save();

        return response.status(201).json({ message: "Invoice Added", newInvoice: savedInvoice });

    } catch (error) {
        return response.status(500).json({ message: "Internal Server Error", error: error.message });
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

//Delete an invoice 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('Attempting to delete invoice with ID:', id);


    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) {
            res.status(404).json({ message: 'Invoice not found' });

        }
        res.status(200).json({ message: ` ${deletedInvoice.DistroInvoiceNum} Invoice deleted successfully` });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});


export default router