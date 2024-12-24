import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ShortenUrlSchema = new Schema({
    shortUrl: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    }
})

const ShortenUrl = mongoose.model('ShortenUrl', ShortenUrlSchema);
export default ShortenUrl