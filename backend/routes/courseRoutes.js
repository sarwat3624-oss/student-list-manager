const express = require("express");

const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// GET all courses
router.get("/", getCourses);

// POST new course
router.post("/", createCourse);

// PUT update course
router.put("/:id", updateCourse);

// DELETE course
router.delete("/:id", deleteCourse);

module.exports = router;