const Student = require("../models/Student");

// GET all students
const getStudents = async (req, res) => {
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
};

// GET single student
const getStudentById = async (req, res) => {
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
};

// POST new student
const createStudent = async (req, res) => {
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
};

// PUT update student
const updateStudent = async (req, res) => {
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
};

// DELETE student
const deleteStudent = async (req, res) => {
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
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};