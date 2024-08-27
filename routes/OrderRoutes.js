import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByBuyer,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, createOrder);
router.route("/").get(getAllOrders);
router.route("/:id").get(getOrderById);
router.route("/buyer/:id").get(verifyToken, getOrderByBuyer);
router.route("/:id").put(verifyToken, updateOrder);
router.route("/:id").delete(verifyToken, deleteOrder);

export default router;
