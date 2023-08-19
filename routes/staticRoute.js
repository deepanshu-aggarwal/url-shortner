import express from "express";
import Url from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async(req, res) => {
  try {
    const allUrls = await Url.find({});
    return res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    res.redirect("/login");
  }
})

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async(req, res) => {
  // if(!req.user) return res.redirect("/login");
  try {
    const allUrls = await Url.find({createdBy: req.user?._id});
    return res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    res.redirect("/login");
  }
})

router.get("/signup", async(req, res) => {
  return res.render("signup");
})

router.get("/login", async(req, res) => {
  return res.render("login");
})

export default router;