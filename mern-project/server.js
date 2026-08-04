import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/odraAdmissions";

app.use(cors());
app.use(express.json());

const admissionSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    course: String,
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

const Admission = mongoose.model("admissions", admissionSchema);

app.post("/api/admissions", async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json({ success: true, admission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

async function startServer() {
  await mongoose.connect(uri);
  console.log("MongoDB connected");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
