import express, { response } from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Invoice } from "./models/invoiceSchema.js";
import invoiceRoutes from "./routes/invoiceRoutes.js"
import cors from "cors";


const app = express();

app.use(express.json());

//Middleware for handling CORS policy
app.use(cors({
    origin: "http://localhost:5555",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type']
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello');
});



mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})