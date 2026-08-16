require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const Student = require("./models/Student");
const Course = require("./models/Course");
const Teacher = require("./models/Teacher");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;

// Home route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// GET all students
app.get("/api/students", async (req, res) => {
  try {
    const className = req.query.className;

    const filter = className ? { className } : {};

    const students = await Student.find(filter);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Students fetch nahi hue",
      error: error.message,
    });
  }
});
// GET all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Courses fetch nahi hue",
      error: error.message,
    });
  }
});
// POST new course
app.post("/api/courses", async (req, res) => {
  try {
    const newCourse = await Course.create({
      name: req.body.name,
      teacher: req.body.teacher,
      duration: req.body.duration,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({
      message: "Course save nahi hua",
      error: error.message,
    });
  }
});
// PUT update course
app.put("/api/courses/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        teacher: req.body.teacher,
        duration: req.body.duration,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Course update nahi hua",
      error: error.message,
    });
  }
});
// DELETE course
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Course delete nahi hua",
      error: error.message,
    });
  }
});
// GET all teachers
app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({
      message: "Teachers fetch nahi hue",
      error: error.message,
    });
  }
});
// POST new teacher
app.post("/api/teachers", async (req, res) => {
  try {
    const newTeacher = await Teacher.create({
      name: req.body.name,
      subject: req.body.subject,
      experience: req.body.experience,
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({
      message: "Teacher save nahi hua",
      error: error.message,
    });
  }
});
// PUT update teacher
app.put("/api/teachers/:id", async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        subject: req.body.subject,
        experience: req.body.experience,
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Teacher update nahi hua",
      error: error.message,
    });
  }
});
// DELETE teacher
app.delete("/api/teachers/:id", async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTeacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
      teacher: deletedTeacher,
    });
  } catch (error) {
    res.status(500).json({
      message: "Teacher delete nahi hua",
      error: error.message,
    });
  }
});

// GET single student
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Student fetch nahi hua",
      error: error.message,
    });
  }
});

// POST new student
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create({
      name: req.body.name,
      age: req.body.age,
      className: req.body.className,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({
      message: "Student save nahi hua",
      error: error.message,
    });
  }
});

// PUT update student
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
        className: req.body.className,
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Student update nahi hua",
      error: error.message,
    });
  }
});

// DELETE student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Student delete nahi hua",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});