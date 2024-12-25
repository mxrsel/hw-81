import express from 'express';
import ShortenUrl from "../models/ShortenUrls";
import {shortenUrl} from "../types";
import Chance from "chance";

export const shortUrlsRouter = express.Router();

shortUrlsRouter.get('/:id', async(req, res) => {
    await ShortenUrl.findById(req.params.id);
    res.status(301).redirect(req.body.originalUrl);
})

shortUrlsRouter.post('/', async(req, res) => {

    const chance = new Chance();

    const newShortenLink: shortenUrl = {
        shortUrl: chance.string({length: 7, alpha: true}),
        originalUrl: req.body.originalUrl
    }

    try {
        const shortUrl = new ShortenUrl(newShortenLink);
        res.send(shortUrl)
        await shortUrl.save()
    } catch(e) {
        console.error(e)
    }
})