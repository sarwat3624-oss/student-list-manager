function StudentCard({
  name,
  className,
  age,
  onDelete,
  onEdit,
}) {
  return (
    <article className="student-card">

      {/* ================= TOP ================= */}

      <div className="student-card-top">

        <div className="student-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <span className="student-status">
          Active
        </span>

      </div>


      {/* ================= DETAILS ================= */}

      <div className="student-details">

        <h3>{name}</h3>

        <p>
          Student ID: ST-{name.length * 100 + age}
        </p>

      </div>


      {/* ================= INFO ================= */}

      <div className="student-info">

        <div>
          <span>Class</span>
          <strong>{className}</strong>
        </div>

        <div>
          <span>Age</span>
          <strong>{age} years</strong>
        </div>

      </div>


      {/* ================= ACTIONS ================= */}

      <div className="student-actions-buttons">

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={onDelete}
        >
          Delete Student
        </button>

      </div>

    </article>
  );
}

export default StudentCard;