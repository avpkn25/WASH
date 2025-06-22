import express from "express";
import {
  createDonor,
  loginUser,
  logoutUser,
  createDCM,
  deleteDCM,
  getAllDCMs,
  getAllDonors,
  createDSP,
  updateDCMProfile,
  updateDSP,
  deleteDSP,
  getAllDSPs,
  registerAndDonate,
} from "../controllers/userController.js";

import { getAllFunds, totalFunds } from "../controllers/fundController.js";
import {
  authenticate,
  authorizeAdmin,
  authorizeDCM,
  authorizeDonor,
  authorizeDSP,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser); // done
router.post("/logout", logoutUser); // done

router.post("/create-donor", createDonor); // done

// Donor Operations
router.post("/add-fund", registerAndDonate);
router.post("/register-and-donate", registerAndDonate);

// Admin Operations
router.post("/create-dcm", authenticate, authorizeAdmin, createDCM);
router.delete("/delete-dcm/:id", authenticate, authorizeAdmin, deleteDCM);
router.get("/get-dcm", authenticate, authorizeAdmin, getAllDCMs);
router.get("/get-donor", authenticate, authorizeAdmin, getAllDonors);
router.get("/get-all-funds", authenticate, authorizeAdmin, getAllFunds);
router.get("/total-funds", authenticate, authorizeAdmin, totalFunds);

// DCM Operations
router.post("/create-dsp", authenticate, authorizeDCM, createDSP);
router.put("/update-dcm/:id", authenticate, authorizeDCM, updateDCMProfile);
router.put("/update-dsp/:id", authenticate, authorizeDCM, updateDSP);
router.delete("/delete-dsp/:id", authenticate, authorizeDCM, deleteDSP);
router.get("/get-dsp", authenticate, authorizeDCM, getAllDSPs);

// DSP Operations

export default router;
