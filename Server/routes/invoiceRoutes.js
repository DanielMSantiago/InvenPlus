import express from 'express';
import { Invoice } from '../models/invoiceSchema.js';

const router = express.Router();

//Send an entered invoice to the database
router.post('/', async (request, response) => {
    try {
        if (!request.body.PoNumber ||
            !request.body.DistroInvoiceNum ||
            !request.body.Distro ||
            !request.body.DistroBranch ||
            !request.body.Warranty ||
            !request.body.AmountOrd ||
            !request.body.ItemModel ||
            !request.body.ItemName ||
            !request.body.ItemPrice
        ) {
            return response.status(400).send({
                message: "Please send all required field: Po Number, Invoice Number, Distributor, Distributor Branch, Warranty, Amount Order, Item Name, Item Model Number",
            })
        }
        const newInvoice = {
            PoNumber: request.body.PoNumber,
            DistroInvoiceNum: request.body.DistroInvoiceNum,
            Distro: request.body.Distro,
            DistroBranch: request.body.DistroBranch,
            CustName: request.body.CustName,
            Warranty: request.body.Warranty,
            AmountOrd: request.body.AmountOrd,
            ItemName: request.body.ItemName,
            ItemModel: request.body.ItemModel,
            ItemSerial: request.body.ItemSerial,
            ItemPrice: request.body.ItemPrice
        }

        const invoice = await Invoice.create(newInvoice)

        return response.status(201).send(invoice)

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Internal Server Error' });
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