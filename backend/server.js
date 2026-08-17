require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

// Database
const connectDB = require("./config/db");

// Error Handler
const errorHandler = require("./middleware/errorMiddleware");

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/teachers", teacherRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Central error handler — ALWAYS LAST
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});