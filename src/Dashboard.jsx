import { useNavigate } from "react-router-dom";
import StudentCard from "./StudentCard";
import StudentForm from "./StudentForm";

function Dashboard({
  academyName,
  adminName,
  currentTime,
  students,
  filteredStudents,
  presentCount,
  absentCount,
  attendancePercentage,
  totalClasses,
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  handleRefresh,
  addStudent,
  setActivePage,
  deleteStudent,
  editStudent,
}) {
   const navigate = useNavigate();
  return (
    <>
      {/* ==================================================
          TOPBAR
      ================================================== */}

      <header className="topbar">
        <div>
          <p className="welcome-small">
            {academyName}
          </p>

          <h1>
            Good afternoon, {adminName} 👋
          </h1>
        </div>

        <div className="dashboard-time">
          <strong>
            {currentTime.toLocaleTimeString()}
          </strong>

          <span>
            {currentTime.toLocaleDateString()}
          </span>
        </div>

        <div className="profile">
          <div className="profile-avatar">
            {adminName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>
              {adminName}
            </strong>

            <span>
              Administrator
            </span>
          </div>
        </div>
      </header>

      {/* ==================================================
          STATISTICS
      ================================================== */}

      <section className="stats">

        <div className="stat-card yellow">

          <div className="stat-icon">
            👩‍🎓
          </div>

          <span>
            Total Students
          </span>

          <strong>
            {students.length}
          </strong>

          <small>
            Students registered
          </small>

        </div>

        <div className="stat-card purple">

          <div className="stat-icon">
            🏫
          </div>

          <span>
            Classes
          </span>

          <strong>
            {totalClasses}
          </strong>

          <small>
            Active classes
          </small>

        </div>

        <div className="stat-card pink">

          <div className="stat-icon">
            📚
          </div>

          <span>
            Active Records
          </span>

          <strong>
            {filteredStudents.length}
          </strong>

          <small>
            Currently visible
          </small>

        </div>

      </section>

      {/* ==================================================
          TODAY SUMMARY
      ================================================== */}

      <section className="today-summary">

        <div className="summary-header">

          <div>
            <span>
              TODAY'S SUMMARY
            </span>

            <h2>
              Academy Overview
            </h2>
          </div>

          <div className="summary-icon">
            📋
          </div>

        </div>

        <div className="summary-content">

          <div>
            <strong>
              {students.length}
            </strong>

            <span>
              Total Students
            </span>
          </div>

          <div>
            <strong>
              {presentCount}
            </strong>

            <span>
              Present Today
            </span>
          </div>

          <div>
            <strong>
              {absentCount}
            </strong>

            <span>
              Absent Today
            </span>
          </div>

          <div>
            <strong>
              {attendancePercentage}%
            </strong>

            <span>
              Attendance Rate
            </span>
          </div>

        </div>

      </section>

      {/* ==================================================
          ADD STUDENT
      ================================================== */}

      <section className="add-section">

        <div className="section-heading">

          <div>
            <span>
              QUICK ACTION
            </span>

            <h2>
              Add new student
            </h2>
          </div>

          <div className="plus-icon">
            +
          </div>

        </div>

        <StudentForm
          onAddStudent={addStudent}
        />

      </section>

      {/* ==================================================
          QUICK ACTIONS
      ================================================== */}

      <section className="quick-actions">

        <div className="section-heading">

          <div>
            <span>
              QUICK ACTIONS
            </span>

            <h2>
              Manage Quickly
            </h2>
          </div>

        </div>

        <div className="quick-action-grid">

          <button
            className="quick-action-card"
            onClick={() => navigate("/students")}
          >

            <div className="quick-action-icon">
              👩‍🎓
            </div>

            <div>
              <strong>
                Add / Manage Students
              </strong>

              <span>
                View and manage students
              </span>
            </div>

            <b>
              →
            </b>

          </button>

          <button
            className="quick-action-card"
            onClick={() => navigate("/attendance")}
          >

            <div className="quick-action-icon">
              ✓
            </div>

            <div>
              <strong>
                Mark Attendance
              </strong>

              <span>
                Record today's attendance
              </span>
            </div>

            <b>
              →
            </b>

          </button>

          <button
            className="quick-action-card"
            onClick={() => navigate("/reports")}
          >

            <div className="quick-action-icon">
              📊
            </div>

            <div>
              <strong>
                View Reports
              </strong>

              <span>
                Check attendance reports
              </span>
            </div>

            <b>
              →
            </b>

          </button>

        </div>

      </section>

      {/* ==================================================
          STUDENT DIRECTORY
      ================================================== */}

      <section className="students-section">

        <div className="section-heading students-heading">

          <div>
            <span>
              STUDENT DIRECTORY
            </span>

            <h2>
              All students
            </h2>
          </div>

          <div className="student-actions">

            <span className="student-count">
              {filteredStudents.length} students
            </span>

            <button
              type="button"
              className="refresh-btn"
              onClick={handleRefresh}
            >
              ↻ Refresh
            </button>

          </div>

        </div>

        {/* FILTERS */}

        <div className="filters">

          <div className="search-container">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(
                e.target.value
              )
            }
          >

            <option value="All">
              All Classes
            </option>

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

        {/* STUDENT CARDS */}

        {filteredStudents.length > 0 ? (

          <div className="student-grid">

            {filteredStudents.map(
              (student) => (

                <StudentCard
                  key={student.id}
                  name={student.name}
                  className={student.className}
                  age={student.age}
                  onDelete={() =>
                    deleteStudent(
                      student.id
                    )
                  }
                  onEdit={() =>
                    editStudent(
                      student.id
                    )
                  }
                />

              )
            )}

          </div>

        ) : (

          <div className="empty-state">

            <div className="empty-icon">
              ⌕
            </div>

            <h2>
              No students found
            </h2>

            <p>
              Try changing your search
              or class filter.
            </p>

          </div>

        )}

      </section>
    </>
  );
}

export default Dashboard;