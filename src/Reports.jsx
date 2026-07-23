function Reports({
  students,
  attendance,
  presentCount,
  absentCount,
  attendancePercentage,
}) {
  return (
    <section className="reports-page">

      <div className="page-header">

        <div>

          <span>
            STUDENT MANAGEMENT
          </span>

          <h1>
            Attendance Reports 📊
          </h1>

          <p>
            View your students' attendance summary.
          </p>

        </div>

      </div>

      {/* REPORT STATS */}

      <div className="report-stats">

        <div className="report-card">
          <span>
            Total Students
          </span>

          <strong>
            {students.length}
          </strong>
        </div>

        <div className="report-card">
          <span>
            Present
          </span>

          <strong>
            {presentCount}
          </strong>
        </div>

        <div className="report-card">
          <span>
            Absent
          </span>

          <strong>
            {absentCount}
          </strong>
        </div>

        <div className="report-card">
          <span>
            Attendance
          </span>

          <strong>
            {attendancePercentage}%
          </strong>
        </div>

      </div>

      {/* REPORT LIST */}

      <div className="report-list">

        <div className="section-heading">

          <div>

            <span>
              ATTENDANCE REPORT
            </span>

            <h2>
              Student Attendance
            </h2>

          </div>

        </div>

        <div className="report-students">

          {students.map((student) => (

            <div
              className="report-student"
              key={student.id}
            >

              <div className="report-student-info">

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

              <div>

                {attendance[student.id] === "Present" ? (

                  <span className="report-present">
                    ✓ Present
                  </span>

                ) : attendance[student.id] === "Absent" ? (

                  <span className="report-absent">
                    ✕ Absent
                  </span>

                ) : (

                  <span className="report-pending">
                    — Not Marked
                  </span>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Reports;