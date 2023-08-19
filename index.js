import express from 'express';
import { connectToMongoDB } from './connectdb.js';
import cookieParser from 'cookie-parser';
import { 
  // checkAuth, 
  // restrictToLoggedinUserOnly, 
  checkForAuthentication, 
  restrictTo 
} from './middlewares/auth.js';

import Url from './models/url.js';

import urlRoute from './routes/url.js';
import staticRoute from './routes/staticRoute.js';
import userRoute from './routes/user.js';

const app = express();
const PORT = 5000;

connectToMongoDB("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("Connected to MongoDB"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/api/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/api/user", userRoute);
// we didnt used restrictToLoggedinUserOnly because in static there is login/signup pages also, so they wont get rendered if no user
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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