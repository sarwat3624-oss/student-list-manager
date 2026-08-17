const Course = require("../models/Course");

// GET all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Courses fetch nahi hue",
      error: error.message,
    });
  }
};

// POST new course
const createCourse = async (req, res) => {
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
};

// PUT update course
const updateCourse = async (req, res) => {
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
};

// DELETE course
const deleteCourse = async (req, res) => {
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
};

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};