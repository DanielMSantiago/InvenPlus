import express from "express";
import mongoose from "mongoose";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import dotenv from 'dotenv'
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;
const app = express();

app.use(express.json());

//Middleware for handling CORS policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Hello, server running!');
});

app.use('/invoice', invoiceRoutes)

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
        console.log('App is listening on port:' + PORT);
    });
}).catch((error) => {
    console.log(error);
})