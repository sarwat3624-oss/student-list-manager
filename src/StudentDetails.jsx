import { useParams, useNavigate } from "react-router-dom";

function StudentDetails({ students }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find(
    (item) => String(item.id) === String(id)
  );

  if (!student) {
    return (
      <section className="students-section">
        <div className="empty-state">
          <h2>Student Not Found</h2>

          <p>
            The student you are looking for does not exist.
          </p>

          <button
            type="button"
            className="refresh-btn"
            onClick={() => navigate("/students")}
          >
            ← Back to Students
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="students-section">

      <div className="section-heading">

        <div>
          <span>
            STUDENT DETAILS
          </span>

          <h2>
            {student.name} 👩‍🎓
          </h2>
        </div>

        <button
          type="button"
          className="refresh-btn"
          onClick={() => navigate("/students")}
        >
          ← Back
        </button>

      </div>

      <div className="student-details-card">

        <div className="student-avatar">
          {student.name
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="student-details-info">

          <h2>
            {student.name}
          </h2>

          <p>
            Student ID: {student.id}
          </p>

          <div className="student-detail-row">
            <strong>Class</strong>
            <span>
              {student.className}
            </span>
          </div>

          <div className="student-detail-row">
            <strong>Age</strong>
            <span>
              {student.age} years
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default StudentDetails;