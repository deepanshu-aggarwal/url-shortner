import express from 'express';
import urlRoute from './routes/url.js';
import { connectToMongoDB } from './connectdb.js';
import Url from './models/url.js';

const app = express();
const PORT = 5000;

connectToMongoDB("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("Connected to MongoDB"));

app.use(express.json());

app.use("/api/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate({
    shortId
  },
  {
    $push: {
      visitHistory: {
        timeStamp: Date.now()
      },
    }
  });
  res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));