import express from "express";
import { UserLogin, UserSignup } from "../controllers/user.js";

const router = express.Router();

router.post("/", UserSignup);
router.post("/login", UserLogin);

export default router;