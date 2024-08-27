import express from "express";

import {
  login,
  register,
  verify,
  logout,
  forgotPassword,
} from "../controllers/AuthController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").get(verify);
router.route("/logout").get(verifyToken, logout);
router.route("/forgot-password").get(forgotPassword);

export default router;
