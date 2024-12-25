import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import {shortUrlsRouter} from "./routers/shortUrls";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/links', shortUrlsRouter);

const run = async() => {
   await mongoose.connect('mongodb://localhost/links');

   app.listen(port, () => {
       console.log(`Server started on port: http://localhost:${port}`);
   });

   process.on('exit', () => {
       mongoDb.disconnect()
   })
}

run().catch(err => console.log(err));