import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
  createReview,
} from "../controllers/ServiceController.js";

const router = express.Router();

router.route("/").post(verifyToken, createService);
router.route("/").get(getAllServices);
router.route("/prov/:id").get(verifyToken, getServicesByProvider);
router.route("/:id").get(getServiceById);
router.route("/:id").put(verifyToken, updateService);
router.route("/:id").delete(verifyToken, deleteService);
router.route("/review/:id").post(verifyToken, createReview);

export default router;
