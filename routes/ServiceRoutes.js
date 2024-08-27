import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
} from "../controllers/ServiceController.js";

const router = express.Router();

router.route("/").post(verifyToken, createService);
router.route("/").get(getAllServices);
router.route("/prov/:id").get(verifyToken, getServicesByProvider);
router.route("/:id").get(getServiceById);
router.route("/:id").put(verifyToken, updateService);
router.route("/:id").delete(verifyToken, deleteService);

export default router;
