const validateStudent = (req, res, next) => {
  const { name, age, className } = req.body;

  if (!name || !age || !className) {
    return res.status(400).json({
      message: "Name, age and className are required",
    });
  }

  if (age < 1 || age > 100) {
    return res.status(400).json({
      message: "Age must be between 1 and 100",
    });
  }

  next();
};

module.exports = validateStudent;