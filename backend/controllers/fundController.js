import Fund from "../models/Fund.js"; // Assuming you have an Admin model

const addFund = async (req, res) => {
  const { amount, type } = req.body;
  try {
    // Validate input
    if (!amount || !type) {
      return res.status(400).json({ message: "Amount and type are required" });
    }

    // Use donorId from authenticated user
    const donorId = req.user && req.user._id ? req.user._id : null;
    if (!donorId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Donor ID not found" });
    }

    // Create new fund entry
    const newFund = new Fund({
      donorId,
      amount,
      mode: type,
    });

    // Save the fund entry to the database
    await newFund.save();

    res.status(201).json({ message: "Fund added successfully", fund: newFund });
  } catch (error) {
    console.error("Error adding fund:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const totalFunds = async (req, res) => {
  try {
    // Aggregate to calculate total funds
    const total = await Fund.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    if (total.length === 0) {
      return res.status(200).json({ totalAmount: 0 });
    }

    res.status(200).json({ totalAmount: total[0].totalAmount });
  } catch (error) {
    console.error("Error calculating total funds:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFunds = async (req, res) => {
  try {
    // Fetch all funds and populate donor info for admin view
    const funds = await Fund.find({}).populate("donorId", "fullName email");
    res.status(200).json(funds);
  } catch (error) {
    console.error("Error fetching funds:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addFund, totalFunds, getAllFunds };
