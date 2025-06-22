import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createDonor = async (req, res) => {
  const { fullName, email, password, phone, gender, dob } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDonor = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
    });
    newDonor.role = "donor"; // Set the role to 'dcm'
    await newDonor.save();
    createToken(res, newDonor._id);
    return res.status(201).json({ message: "Donor created successfully" });
  } catch (error) {
    console.error("Error creating DSP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role, // Ensure role is returned
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User Not Found" });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out Successfully" });
};

const createDCM = async (req, res) => {
  const { fullName, email, password, phone, gender, dob } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDCM = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
    });
    newDCM.role = "dcm";
    await newDCM.save();
    return res.status(201).json({ message: "DCM created successfully" });
  } catch (error) {
    console.error("Error creating DCM:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDCM = async (req, res) => {
  const { id } = req.params;

  try {
    const dcm = await User.findById(id);
    if (!dcm) {
      return res.status(404).json({ message: "DCM not found" });
    }

    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "DCM deleted successfully" });
  } catch (error) {
    console.error("Error deleting DCM:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllDCMs = async (req, res) => {
  try {
    const dcmList = await User.find({ role: "dcm" }).select("-password");
    // Map fields to match frontend expectations
    const mappedList = dcmList.map((user) => ({
      id: user._id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
    }));
    return res.status(200).json(mappedList);
  } catch (error) {
    console.error("Error fetching DCMs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllDonors = async (req, res) => {
  try {
    const donorList = await User.find({ role: "donor" }).select("-password");
    return res.status(200).json(donorList);
  } catch (error) {
    console.error("Error fetching donors:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createDSP = async (req, res) => {
  const { fullName, email, password, phone, gender, dob } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDSP = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      gender,
      dob,
      role: "dsp", // Set role directly in constructor
    });
    await newDSP.save();
    return res.status(201).json({ message: "DSP created successfully" });
  } catch (error) {
    console.error("Error creating DSP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateDCMProfile = async (req, res) => {
  const DCM = await User.findById(req.user._id);
  if (DCM) {
    DCM.fullName = req.body.fullName || DCM.fullName;
    DCM.phone = req.body.phone || DCM.phone;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      DCM.password = hashedPassword;
    }

    const updatedDCM = await DCM.save();

    res.json(updatedDCM);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
};

const updateDSP = async (req, res) => {
  const { id } = req.params;
  const DSP = await User.findById(id);
  if (DSP) {
    DSP.fullName = req.body.fullName || DSP.fullName;
    DSP.email = req.body.email || DSP.email;
    DSP.phone = req.body.phone || DSP.phone;
    DSP.gender = req.body.gender || DSP.gender;
    DSP.dob = req.body.dob || DSP.dob;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      DSP.password = hashedPassword;
    }

    const updatedDSP = await DSP.save();

    res.json(updatedDSP);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
};

const deleteDSP = async (req, res) => {
  const { id } = req.params;

  try {
    const dsp = await User.findById(id);
    if (!dsp) {
      return res.status(404).json({ message: "DSP not found" });
    }
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "DSP deleted successfully" });
  } catch (error) {
    console.error("Error deleting DSP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllDSPs = async (req, res) => {
  try {
    const dspList = await User.find({ role: "dsp" }).select("-password");
    return res.status(200).json(dspList);
  } catch (error) {
    console.error("Error fetching DSPs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Register donor and add fund in one API
const registerAndDonate = async (req, res) => {
  const { fullName, email, password, phone, gender, dob, amount, paymentMode } =
    req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Password must be provided for new user
      if (!password) {
        return res
          .status(400)
          .json({ message: "Password is required for new donor registration" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new User({
        fullName,
        email,
        password: hashedPassword,
        phone,
        gender,
        dob,
        role: "donor",
      });
      await user.save();
    }
    // Add fund entry
    const Fund = (await import("../models/Fund.js")).default;
    const newFund = new Fund({
      donorId: user._id,
      amount,
      mode: paymentMode,
    });
    await newFund.save();
    return res
      .status(201)
      .json({ message: "Donation successful", fund: newFund, user });
  } catch (error) {
    console.error("Error in registerAndDonate:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DSPProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const dsp = await User.findById(id).select("-password");
    if (!dsp) {
      return res.status(404).json({ message: "DSP not found" });
    }
    return res.status(200).json(dsp);
  } catch (error) {
    console.error("Error fetching DSP profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
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
  createDonor,
  registerAndDonate,
  DSPProfile,
};
