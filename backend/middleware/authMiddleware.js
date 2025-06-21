import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authenticated token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authenticated token failed.");
  }
};

const authorizeDSP = (req, res, next) => {
  if (req.user && req.user.isDSP) {
    next();
  } else {
    res.status(401).send("Not authorized as an DSP.");
  }
};

const authorizeDCM = (req, res, next) => {
  if (req.user && req.user.isDCM) {
    next();
  } else {
    res.status(401).send("Not authorized as an DCM.");
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.admin) {
    next();
  } else {
    res.status(401).send("Not authorized as an Admin.");
  }
};

const authorizeDonor = (req, res, next) => {
  if (req.user && req.user.isDonor) {
    next();
  } else {
    res.status(401).send("Not authorized as a Donor.");
  }
};

export {
  authenticate,
  authorizeDSP,
  authorizeDCM,
  authorizeAdmin,
  authorizeDonor,
};
