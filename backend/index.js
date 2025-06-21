import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";

import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
