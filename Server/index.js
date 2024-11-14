import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";

const app = express();

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