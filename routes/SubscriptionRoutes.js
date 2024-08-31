import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getSubscriptionBySubscriber,
  updateOrder,
  deleteOrder,
} from "../controllers/SubscriptionController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, createOrder);
router.route("/").get(getAllOrders);
router.route("/:id").get(getOrderById);
router.route("/sub/:id").get(verifyToken, getSubscriptionBySubscriber);
router.route("/:id").put(verifyToken, updateOrder);
router.route("/:id").delete(verifyToken, deleteOrder);

export default router;
