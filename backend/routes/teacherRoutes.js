const express = require("express");

const {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController");

const router = express.Router();

// GET all teachers
router.get("/", getTeachers);

// POST new teacher
router.post("/", createTeacher);

// PUT update teacher
router.put("/:id", updateTeacher);

// DELETE teacher
router.delete("/:id", deleteTeacher);

module.exports = router;