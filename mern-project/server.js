import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
let uri = process.env.MONGO_URI || "";
let mongoServer;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

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

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

const Faculty = mongoose.model("faculty", facultySchema);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/admissions", async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json({ success: true, admission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/faculty", async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/faculty", async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/faculty/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/faculty/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.json({ success: true, message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "fallback route", path: req.path });
});

async function startServer() {
  if (!uri) {
    mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    console.log("Using in-memory MongoDB for local development");
  }

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
