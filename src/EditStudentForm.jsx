import { useState } from "react";

function EditStudentForm({
  student,
  onSave,
  onCancel,
}) {

  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [className, setClassName] = useState(student.className);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !age || !className) {
      return;
    }

    const updatedStudent = {
      ...student,
      name: name.trim(),
      age: Number(age),
      className: className,
    };

    onSave(updatedStudent);
  }

  return (
    <div className="edit-overlay">


      <div className="edit-form-container">

        {/* HEADER */}

        <div className="edit-form-header">

          <div>
            <span>
              STUDENT MANAGEMENT
            </span>

            <h2>
              Edit Student
            </h2>
          </div>

          <button
            className="close-edit-btn"
            onClick={onCancel}
            type="button"
          >
            ×
          </button>

        </div>


        {/* FORM */}

        <form
          className="edit-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

          <div className="form-field">

            <label>
              Student Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          {/* AGE */}

          <div className="form-field">

            <label>
              Age
            </label>

            <input
              type="number"
              value={age}
              onChange={(e) =>
                setAge(e.target.value)
              }
            />

          </div>


          {/* CLASS */}

          <div className="form-field">

            <label>
              Class
            </label>

            <select
              value={className}
              onChange={(e) =>
                setClassName(e.target.value)
              }
            >

              <option value="8th">
                8th
              </option>

              <option value="9th">
                9th
              </option>

              <option value="10th">
                10th
              </option>

              <option value="11th">
                11th
              </option>

              <option value="12th">
                12th
              </option>

            </select>

          </div>


          {/* BUTTONS */}

          <div className="edit-form-buttons">

            <button
              type="button"
              className="cancel-edit-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-edit-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditStudentForm;