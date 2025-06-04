const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

// Route imports
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments");

//----------------------------------------------- Environment Setup
dotenv.config();

//----------------------------------------------- Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database Connected!");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
  }
};

//----------------------------------------------- Middleware
app.use(express.json());
app.use(cookieParser());

// Correct CORS setup
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend origin
  credentials: true, // ✅ must be "credentials" not "credential"
};
app.use(cors(corsOptions));

// Serve static files
app.use("/images", express.static(path.join(__dirname, "/images")));

//----------------------------------------------- API Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

//----------------------------------------------- File Upload (Multer)
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image uploaded successfully.");
});

//----------------------------------------------- Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
