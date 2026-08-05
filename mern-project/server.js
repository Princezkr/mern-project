import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let uri = process.env.MONGO_URI || "";
let mongoServer;

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "Princezkr26@gmail.com").trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Princezkr!(@)))^";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "4h";
const adminPasswordHash = bcrypt.hashSync(ADMIN_PASSWORD, 10);

app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "src", "assets")));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    duration: { type: String, trim: true }
  },
  { timestamps: true }
);

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    tag: { type: String, trim: true },
    category: { type: String, default: "notice", enum: ["notice", "event", "circular"] },
    time: { type: String, trim: true }
  },
  { timestamps: true }
);

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    src: { type: String, required: true, trim: true },
    type: { type: String, default: "image", enum: ["image", "video"] },
    category: { type: String, default: "photo", enum: ["photo", "video", "event"] },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

const admissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true }
  },
  { timestamps: true }
);

const Course = mongoose.model("courses", courseSchema);
const Notice = mongoose.model("notices", noticeSchema);
const Gallery = mongoose.model("gallery", gallerySchema);
const Admission = mongoose.model("admissions", admissionSchema);
const Faculty = mongoose.model("faculty", facultySchema);

async function seedPublicContent() {
  const starterNotices = [
      { title: "Admission Deadline Extended", date: "2026-08-10", tag: "NEW", content: "Admission applications are open for an extended period.", category: "notice" },
      { title: "Exam Schedule Released", date: "2026-08-05", tag: "IMPORTANT", content: "The examination schedule is now available.", category: "notice" },
      { title: "Library Access Updated", date: "2026-07-30", content: "Updated library access information for students.", category: "notice" },
      { title: "Tech Fest 2026", date: "2026-09-15", time: "10:00 AM", content: "Annual technology festival.", category: "event" },
      { title: "Hackathon", date: "2026-10-01", time: "9:30 AM", content: "Campus coding challenge.", category: "event" },
      { title: "Career Guidance Seminar", date: "2026-10-12", time: "11:00 AM", content: "Career guidance session for students.", category: "event" },
      { title: "Attendance Policy Update", date: "2026-07-20", content: "Updated attendance guidelines for all semesters.", category: "circular" },
      { title: "Campus Safety Notice", date: "2026-07-25", content: "Emergency contact and visitor entry procedures.", category: "circular" },
  ];
  for (const notice of starterNotices) {
    await Notice.updateOne({ title: notice.title }, { $setOnInsert: notice }, { upsert: true });
  }

  const starterGallery = [
      { title: "Students at a campus event", src: "/media/Gallery1.jpg", type: "image", category: "photo" },
      { title: "College campus activity", src: "/media/Gallery2.jpg", type: "image", category: "photo" },
      { title: "Students celebrating together", src: "/media/Gallery3.jpg", type: "image", category: "photo" },
      { title: "Campus video 1", src: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "video", category: "video" },
      { title: "Campus video 2", src: "https://www.youtube.com/embed/Ez8F0nW6S-w", type: "video", category: "video" },
      { title: "Tech Fest", src: "/media/Tech-Fest.jpg", type: "image", category: "event" },
      { title: "Cultural Fest", src: "/media/Cultural-Fest.jpg", type: "image", category: "event" },
  ];
  for (const item of starterGallery) {
    await Gallery.updateOne({ title: item.title }, { $setOnInsert: item }, { upsert: true });
    await Gallery.updateMany(
      { title: item.title, src: new RegExp("^https?://localhost:\\d+/media/") },
      { $set: { src: item.src } }
    );
  }
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication token missing" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail !== ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const passwordIsValid = await bcrypt.compare(password, adminPasswordHash);
    if (!passwordIsValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign({ email: normalizedEmail }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/courses", authMiddleware, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/courses/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/courses/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.json({ success: true, message: "Course deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/notices", authMiddleware, async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/notices/:id", authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found." });
    res.json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/notices/:id", authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: "Notice not found." });
    res.json({ success: true, message: "Notice deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/gallery", async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/gallery", authMiddleware, async (req, res) => {
  try {
    const galleryItem = new Gallery(req.body);
    await galleryItem.save();
    res.status(201).json({ success: true, galleryItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/gallery/:id", authMiddleware, async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!galleryItem) return res.status(404).json({ success: false, message: "Gallery item not found." });
    res.json({ success: true, galleryItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/gallery/:id", authMiddleware, async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!galleryItem) return res.status(404).json({ success: false, message: "Gallery item not found." });
    res.json({ success: true, message: "Gallery item deleted." });
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

app.post("/api/faculty", authMiddleware, async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/faculty/:id", authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/faculty/:id", authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.json({ success: true, message: "Faculty deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Visitors can submit an application; reviewing and changing its status stays admin-only.
app.post("/api/admissions", async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json({ success: true, admission });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/api/admissions", authMiddleware, async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/admissions/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (typeof status !== "string") {
      return res.status(400).json({ success: false, message: "Status is required." });
    }

    const admission = await Admission.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!admission) return res.status(404).json({ success: false, message: "Admission not found." });
    res.json({ success: true, admission });
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
  await seedPublicContent();
  console.log("MongoDB connected");

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
