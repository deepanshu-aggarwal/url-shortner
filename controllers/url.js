import { nanoid } from "nanoid";
import Url from "../models/url.js";

async function generateNewShortURL(req, res){
  const body = req.body;
  // console.log(body);
  if(!body.url) return res.status(400).json({msg: "No url recieved"});
  const shortId = nanoid(8);
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  })

  // istead of sending json, send the html file, when form sends the data
  // return res.json({id: shortId});
  return res.render("home", {id: shortId});
}

async function getAnalytics(req, res){
  const {shortId} = req.params;
  const result = await Url.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  })
}

export {
  generateNewShortURL,
  getAnalytics
}