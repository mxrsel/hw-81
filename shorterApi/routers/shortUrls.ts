import express from 'express';
import ShortenUrl from "../models/ShortenUrls";
import {shortenUrl} from "../types";
import Chance from "chance";

export const shortUrlsRouter = express.Router();

shortUrlsRouter.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortenUrl.findOne({shortUrl: req.params.shortUrl});

    if(shortUrl) {
        res.status(301).redirect(shortUrl.originalUrl);
    } else {
        res.status(404).send({error: 'short url not found'})
    }


})

shortUrlsRouter.post('/', async(req, res) => {

    const chance = new Chance();

    const newShortenLink: shortenUrl = {
        shortUrl: chance.string({length: 7, alpha: true}),
        originalUrl: req.body.originalUrl
    }

    try {
        const shortUrl = new ShortenUrl(newShortenLink);
        await shortUrl.save();
        res.send(shortUrl);
    } catch(e) {
        console.error(e)
    }
})