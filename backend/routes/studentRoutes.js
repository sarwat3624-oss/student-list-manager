const express = require("express");
const validateStudent = require("../validators/studentValidator");

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

// GET all students
router.get("/", getStudents);

// GET single student
router.get("/:id", getStudentById);

// POST new student
router.post("/", validateStudent, createStudent);

// PUT update student
router.put("/:id", validateStudent, updateStudent);

// DELETE student
router.delete("/:id", deleteStudent);

module.exports = router;