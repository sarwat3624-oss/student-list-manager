const Teacher = require("../models/Teacher");

// GET all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({
      message: "Teachers fetch nahi hue",
      error: error.message,
    });
  }
};

// POST new teacher
const createTeacher = async (req, res) => {
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
};

// PUT update teacher
const updateTeacher = async (req, res) => {
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
};

// DELETE teacher
const deleteTeacher = async (req, res) => {
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
};

module.exports = {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};