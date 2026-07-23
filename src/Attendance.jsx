function Attendance({
  students,
  attendance,
  markAttendance,
  resetAttendance,
  presentCount,
  absentCount,
  attendancePercentage,
}) {
  return (
    <section className="attendance-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <span>
            STUDENT MANAGEMENT
          </span>

          <h1>
            Attendance ✓
          </h1>

          <p>
            Manage student attendance easily.
          </p>

        </div>

        <div className="attendance-actions">

          <div className="attendance-date">
            📅 Today
          </div>

          <button
            type="button"
            className="reset-attendance-btn"
            onClick={resetAttendance}
          >
            ↻ Reset
          </button>

        </div>

      </div>

      {/* ATTENDANCE STATS */}

      <div className="attendance-stats">

        <div className="attendance-card">

          <span>
            Total Students
          </span>

          <strong>
            {students.length}
          </strong>

        </div>

        <div className="attendance-card">

          <span>
            Present
          </span>

          <strong>
            {presentCount}
          </strong>

        </div>

        <div className="attendance-card">

          <span>
            Absent
          </span>

          <strong>
            {absentCount}
          </strong>

        </div>

        <div className="attendance-card">

          <span>
            Attendance
          </span>

          <strong>
            {attendancePercentage}%
          </strong>

        </div>

      </div>

      {/* ATTENDANCE LIST */}

      <div className="attendance-list">

        <div className="section-heading">

          <div>

            <span>
              ATTENDANCE RECORD
            </span>

            <h2>
              Mark Attendance
            </h2>

          </div>

        </div>

        {students.length > 0 ? (

          <div className="attendance-students">

            {students.map((student) => (

              <div
                className="attendance-student"
                key={student.id}
              >

                {/* STUDENT INFO */}

                <div className="attendance-student-info">

                  <div className="student-avatar">

                    {student.name
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  <div>

                    <strong>
                      {student.name}
                    </strong>

                    <span>
                      {student.className}
                      {" • "}
                      {student.age}
                      {" years"}
                    </span>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="attendance-buttons">

                  <button
                    type="button"
                    className={
                      attendance[student.id] ===
                      "Present"
                        ? "present-btn selected"
                        : "present-btn"
                    }
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "Present"
                      )
                    }
                  >
                    ✓ Present
                  </button>

                  <button
                    type="button"
                    className={
                      attendance[student.id] ===
                      "Absent"
                        ? "absent-btn selected"
                        : "absent-btn"
                    }
                    onClick={() =>
                      markAttendance(
                        student.id,
                        "Absent"
                      )
                    }
                  >
                    ✕ Absent
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="empty-state">

            <h2>
              No students available
            </h2>

            <p>
              Add students first to mark
              attendance.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default Attendance;