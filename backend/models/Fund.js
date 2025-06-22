import mongoose from "mongoose";

const fundSchema = new mongoose.Schema(
  {
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
        enum: ["UPI", "CARD", "NET_BANKING", "WALLET"],
    },
    date: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const Fund = mongoose.model("Fund", fundSchema);
export default Fund;
