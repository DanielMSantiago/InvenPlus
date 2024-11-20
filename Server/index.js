import express, { response } from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Invoice } from "./models/invoiceSchema.js";

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello');
});

app.post('/invoice', async (request, response) => {
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
        response.status(500).send({ mesage: 'Internal Server Error' });
    }
});

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})