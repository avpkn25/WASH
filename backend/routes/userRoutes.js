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
} from "../controllers/userController.js";

import {
  addFund,
  getAllFunds,
  totalFunds,
} from "../controllers/fundController.js";
import {
  authenticate,
  authorizeAdmin,
  authorizeDCM,
  authorizeDSP,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser); // done
router.post("/logout", logoutUser); // done

router.post("/create-donor", createDonor); // done
// Donor Operations
router.post("add-fund", authenticate, authorizeDSP, addFund);
router.get("get-all-funds", authenticate, authorizeDSP, getAllFunds);
router.get("total-funds", authenticate, authorizeDSP, totalFunds);

// Admin Operations
router.post("create-dcm", authenticate, authorizeAdmin, createDCM);
router.delete("delete-dcm/:id", authenticate, authorizeAdmin, deleteDCM);
router.get("get-dcm", authenticate, authorizeAdmin, getAllDCMs);
router.get("get-donor", authenticate, authorizeAdmin, getAllDonors);

// DCM Operations
router.post("create-dsp", authenticate, authorizeDCM, createDSP);
router.put("update-dcm/:id", authenticate, authorizeDCM, updateDCMProfile);
router.put("update-dsp/:id", authenticate, authorizeDCM, updateDSP);
router.delete("delete-dsp/:id", authenticate, authorizeDCM, deleteDSP);
router.get("get-dsp", authenticate, authorizeDCM, getAllDSPs);

// DSP Operations

export default router;
