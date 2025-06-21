import User from "../models/User.js"; // Assuming you have an Admin model
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
    createToken(res, newDCM._id);
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
    return res.status(200).json(dcmList);
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
    });
    newDSP.role = "dsp"; // Set the role to 'dcm'
    await newDSP.save();
    createToken(res, newDSP._id);
    return res.status(201).json({ message: "DCM created successfully" });
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
};
