import { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Student name is required.";
    }

    // Age validation
    if (!age) {
      newErrors.age = "Age is required.";
    } else if (Number(age) < 5 || Number(age) > 100) {
      newErrors.age = "Please enter a valid age.";
    }

    // Class validation
    if (!className) {
      newErrors.className = "Please select a class.";
    }

    // Show errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      age: Number(age),
      className: className,
    };

    onAddStudent(newStudent);

    // Clear form
    setName("");
    setAge("");
    setClassName("");
    setErrors({});
  }

  return (
    <form
      className="student-form"
      onSubmit={handleSubmit}
    >
      {/* ================= NAME ================= */}

      <div className="form-field">
        <label>Student Name</label>

        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            if (errors.name) {
              setErrors({
                ...errors,
                name: "",
              });
            }
          }}
        />

        {errors.name && (
          <small className="form-error">
            {errors.name}
          </small>
        )}
      </div>

      {/* ================= AGE ================= */}

      <div className="form-field">
        <label>Age</label>

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);

            if (errors.age) {
              setErrors({
                ...errors,
                age: "",
              });
            }
          }}
        />

        {errors.age && (
          <small className="form-error">
            {errors.age}
          </small>
        )}
      </div>

      {/* ================= CLASS ================= */}

      <div className="form-field">
        <label>Class</label>

        <select
          value={className}
          onChange={(e) => {
            setClassName(e.target.value);

            if (errors.className) {
              setErrors({
                ...errors,
                className: "",
              });
            }
          }}
        >
          <option value="">
            Select Class
          </option>

          <option value="8th">8th</option>
          <option value="9th">9th</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>

        {errors.className && (
          <small className="form-error">
            {errors.className}
          </small>
        )}
      </div>

      {/* ================= BUTTON ================= */}

      <button
        className="add-btn"
        type="submit"
      >
        + Add Student
      </button>
    </form>
  );
}

export default StudentForm;