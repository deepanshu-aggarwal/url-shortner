import express from 'express';
import { generateNewShortURL, getAnalytics } from '../controllers/url.js';

const router = express.Router();

router.post("/", generateNewShortURL);

router.get("/analytics/:shortUrl", getAnalytics)

export default router;