import { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
import StudentForm from "./StudentForm";
import EditStudentForm from "./EditStudentForm";
import { fetchStudents } from "./services/studentApi";
import "./App.css";

function App() {
  // ================= STUDENTS =================

  const [students, setStudents] = useState([]);

  // ================= LOADING =================

  const [loading, setLoading] = useState(true);

  // ================= ERROR =================

  const [error, setError] = useState("");

  // ================= SEARCH =================

  const [search, setSearch] = useState("");

  // ================= EDIT =================

  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // ================= CLASS FILTER =================

  const [selectedClass, setSelectedClass] = useState("All");

  // ================= ATTENDANCE =================

  const [attendance, setAttendance] = useState(() => {
    const savedAttendance = localStorage.getItem("attendance");

    return savedAttendance
      ? JSON.parse(savedAttendance)
      : {};
  });

  // ================= ACTIVE PAGE =================

  const [activePage, setActivePage] = useState("Dashboard");

  // ================= CLOCK =================

  const [currentTime, setCurrentTime] = useState(new Date());

  // ================= SETTINGS =================

  const [academyName, setAcademyName] = useState(() => {
    return (
      localStorage.getItem("academyName") ||
      "Studently Academy"
    );
  });

  const [adminName, setAdminName] = useState(() => {
    return (
      localStorage.getItem("adminName") ||
      "Sarwat"
    );
  });

  // ==================================================
  // CLOCK
  // ==================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // ==================================================
  // LOAD STUDENTS
  // ==================================================

  async function loadStudents() {
    try {
      setLoading(true);
      setError("");

      const savedStudents = localStorage.getItem("students");

      if (savedStudents) {
        const studentsFromStorage =
          JSON.parse(savedStudents);

        setStudents(studentsFromStorage);
        return;
      }

      const data = await fetchStudents();

      const formattedStudents = data.map(
        (user, index) => ({
          id: user.id,
          name: user.name,
          className: [
            "8th",
            "9th",
            "10th",
            "11th",
            "12th",
          ][index % 5],
          age: 17 + (index % 3),
        })
      );

      localStorage.setItem(
        "students",
        JSON.stringify(formattedStudents)
      );

      setStudents(formattedStudents);
    } catch (err) {
      console.log("Error:", err);

      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  }

  // ==================================================
  // REFRESH
  // ==================================================

  function handleRefresh() {
    setSearch("");
    setSelectedClass("All");
    setError("");

    loadStudents();
  }

  // ==================================================
  // USE EFFECT
  // ==================================================

  useEffect(() => {
    loadStudents();
  }, []);

  // ==================================================
  // ADD STUDENT
  // ==================================================

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: Date.now(),
    };

    setStudents((previousStudents) => {
      const updatedStudents = [
        ...previousStudents,
        newStudent,
      ];

      localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
      );

      return updatedStudents;
    });
  }

  // ==================================================
  // DELETE STUDENT
  // ==================================================

  function deleteStudent(id) {
    setStudents((previousStudents) => {
      const updatedStudents =
        previousStudents.filter(
          (student) => student.id !== id
        );

      localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
      );

      return updatedStudents;
    });

    setAttendance((previousAttendance) => {
      const updatedAttendance = {
        ...previousAttendance,
      };

      delete updatedAttendance[id];

      localStorage.setItem(
        "attendance",
        JSON.stringify(updatedAttendance)
      );

      return updatedAttendance;
    });
  }

  // ==================================================
  // EDIT STUDENT
  // ==================================================

  function editStudent(id) {
    const student = students.find(
      (student) => student.id === id
    );

    if (!student) {
      return;
    }

    setEditingStudent(student);
    setShowEditForm(true);
  }

  // ==================================================
  // SAVE EDITED STUDENT
  // ==================================================

  function saveEditedStudent(updatedStudent) {
    setStudents((previousStudents) => {
      const updatedStudents =
        previousStudents.map((student) =>
          student.id === updatedStudent.id
            ? updatedStudent
            : student
        );

      localStorage.setItem(
        "students",
        JSON.stringify(updatedStudents)
      );

      return updatedStudents;
    });

    setShowEditForm(false);
    setEditingStudent(null);
  }

  // ==================================================
  // CANCEL EDIT
  // ==================================================

  function cancelEdit() {
    setShowEditForm(false);
    setEditingStudent(null);
  }

  // ==================================================
  // FILTER STUDENTS
  // ==================================================

  const filteredStudents = students.filter(
    (student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesClass =
        selectedClass === "All" ||
        student.className === selectedClass;

      return matchesSearch && matchesClass;
    }
  );

  // ==================================================
  // TOTAL CLASSES
  // ==================================================

  const totalClasses = new Set(
    students.map(
      (student) => student.className
    )
  ).size;

  // ==================================================
  // MARK ATTENDANCE
  // ==================================================

  function markAttendance(studentId, status) {
    setAttendance((previousAttendance) => {
      const updatedAttendance = {
        ...previousAttendance,
        [studentId]: status,
      };

      localStorage.setItem(
        "attendance",
        JSON.stringify(updatedAttendance)
      );

      return updatedAttendance;
    });
  }

  // ==================================================
  // RESET ATTENDANCE
  // ==================================================

  function resetAttendance() {
    setAttendance({});
    localStorage.removeItem("attendance");
  }

  // ==================================================
  // ATTENDANCE COUNTS
  // ==================================================

  const presentCount = students.filter(
    (student) =>
      attendance[student.id] === "Present"
  ).length;

  const absentCount = students.filter(
    (student) =>
      attendance[student.id] === "Absent"
  ).length;

  // ==================================================
  // ATTENDANCE PERCENTAGE
  // ==================================================

  const attendancePercentage =
    students.length > 0
      ? Math.round(
          (presentCount / students.length) * 100
        )
      : 0;

  // ==================================================
  // LOADING SCREEN
  // ==================================================

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading students...</h2>

        <p>
          Please wait while we load student data.
        </p>
      </div>
    );
  }

  // ==================================================
  // ERROR SCREEN
  // ==================================================

  if (error) {
    return (
      <div className="loading-screen">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button
          className="retry-btn"
          onClick={handleRefresh}
        >
          Try Again
        </button>
      </div>
    );
  }

  // ==================================================
  // RETURN
  // ==================================================

  return (
    <div className="dashboard">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="sidebar">

        {/* BRAND */}

        <div className="brand">

          <div className="brand-icon">
            S
          </div>

          <div>
            <strong>
              {academyName}
            </strong>

            <span>
              Management
            </span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="navigation">

          <p className="nav-title">
            MAIN MENU
          </p>

          <button
            className={`nav-item ${
              activePage === "Dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("Dashboard")
            }
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={`nav-item ${
              activePage === "Students"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("Students")
            }
          >
            <span>♙</span>
            Students
          </button>

          <button
            className={`nav-item ${
              activePage === "Attendance"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("Attendance")
            }
          >
            <span>✓</span>
            Attendance
          </button>

          <button
            className={`nav-item ${
              activePage === "Reports"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("Reports")
            }
          >
            <span>▤</span>
            Reports
          </button>

          <button
            className={`nav-item ${
              activePage === "Settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActivePage("Settings")
            }
          >
            <span>⚙</span>
            Settings
          </button>

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">
          <p>Student Manager</p>

          <small>
            React Day 3 Project
          </small>
        </div>

      </aside>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="main-content">

        {/* ==================================================
            DASHBOARD
        ================================================== */}

        {activePage === "Dashboard" && (
          <>

            {/* TOPBAR */}

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
                  {adminName
                    .charAt(0)
                    .toUpperCase()}
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

            {/* STATISTICS */}

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

            {/* TODAY SUMMARY */}

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

            {/* ADD STUDENT */}

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

            {/* QUICK ACTIONS */}

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
                  onClick={() =>
                    setActivePage("Students")
                  }
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

                  <b>→</b>

                </button>

                <button
                  className="quick-action-card"
                  onClick={() =>
                    setActivePage("Attendance")
                  }
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

                  <b>→</b>

                </button>

                <button
                  className="quick-action-card"
                  onClick={() =>
                    setActivePage("Reports")
                  }
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

                  <b>→</b>

                </button>

              </div>

            </section>

            {/* STUDENTS */}

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

                  <span>⌕</span>

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
        )}

        {/* ==================================================
            STUDENTS PAGE
        ================================================== */}

        {activePage === "Students" && (

          <section className="students-section">

            <div className="section-heading">

              <div>
                <span>
                  STUDENT DIRECTORY
                </span>

                <h2>
                  All Students 👩‍🎓
                </h2>
              </div>

            </div>

            <div className="filters">

              <div className="search-container">

                <span>⌕</span>

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

        )}

        {/* ==================================================
            ATTENDANCE PAGE
        ================================================== */}

        {activePage === "Attendance" && (

          <section className="attendance-page">

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
                <span>Total Students</span>
                <strong>
                  {students.length}
                </strong>
              </div>

              <div className="attendance-card">
                <span>Present</span>
                <strong>
                  {presentCount}
                </strong>
              </div>

              <div className="attendance-card">
                <span>Absent</span>
                <strong>
                  {absentCount}
                </strong>
              </div>

              <div className="attendance-card">
                <span>Attendance</span>
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

                  {students.map(
                    (student) => (

                      <div
                        className="attendance-student"
                        key={student.id}
                      >

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

                        <div className="attendance-buttons">

                          <button
                            type="button"
                            className={
                              attendance[
                                student.id
                              ] === "Present"
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
                              attendance[
                                student.id
                              ] === "Absent"
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

                    )
                  )}

                </div>

              ) : (

                <div className="empty-state">

                  <h2>
                    No students available
                  </h2>

                  <p>
                    Add students first to
                    mark attendance.
                  </p>

                </div>

              )}

            </div>

          </section>

        )}

        {/* ==================================================
            REPORTS
        ================================================== */}

        {activePage === "Reports" && (

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

            <div className="report-stats">

              <div className="report-card">
                <span>Total Students</span>
                <strong>
                  {students.length}
                </strong>
              </div>

              <div className="report-card">
                <span>Present</span>
                <strong>
                  {presentCount}
                </strong>
              </div>

              <div className="report-card">
                <span>Absent</span>
                <strong>
                  {absentCount}
                </strong>
              </div>

              <div className="report-card">
                <span>Attendance</span>
                <strong>
                  {attendancePercentage}%
                </strong>
              </div>

            </div>

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

                {students.map(
                  (student) => (

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

                        {attendance[
                          student.id
                        ] === "Present" ? (

                          <span className="report-present">
                            ✓ Present
                          </span>

                        ) : attendance[
                          student.id
                        ] === "Absent" ? (

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

                  )
                )}

              </div>

            </div>

          </section>

        )}

        {/* ==================================================
            SETTINGS
        ================================================== */}

        {activePage === "Settings" && (

          <section className="settings-page">

            <div className="page-header">

              <div>

                <span>
                  STUDENT MANAGEMENT
                </span>

                <h1>
                  Settings ⚙️
                </h1>

                <p>
                  Manage your student management system.
                </p>

              </div>

            </div>

            <div className="settings-card">

              <div className="settings-card-header">

                <div>

                  <span>
                    GENERAL SETTINGS
                  </span>

                  <h2>
                    Academy Information
                  </h2>

                </div>

              </div>

              {/* ACADEMY NAME */}

              <div className="setting-item">

                <label>
                  Academy Name
                </label>

                <input
                  type="text"
                  value={academyName}
                  onChange={(e) =>
                    setAcademyName(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* ADMIN NAME */}

              <div className="setting-item">

                <label>
                  Admin Name
                </label>

                <input
                  type="text"
                  value={adminName}
                  onChange={(e) =>
                    setAdminName(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* SAVE */}

              <button
                type="button"
                className="save-settings-btn"
                onClick={() => {

                  const newAcademyName =
                    academyName.trim();

                  const newAdminName =
                    adminName.trim();

                  if (!newAcademyName) {
                    alert(
                      "Please enter academy name."
                    );
                    return;
                  }

                  if (!newAdminName) {
                    alert(
                      "Please enter admin name."
                    );
                    return;
                  }

                  localStorage.setItem(
                    "academyName",
                    newAcademyName
                  );

                  localStorage.setItem(
                    "adminName",
                    newAdminName
                  );

                  setAcademyName(
                    newAcademyName
                  );

                  setAdminName(
                    newAdminName
                  );

                  alert(
                    "Settings saved successfully!"
                  );
                }}
              >
                💾 Save Settings
              </button>

            </div>

            {/* PREVIEW */}

            <div className="settings-preview">

              <span>
                CURRENT SETTINGS
              </span>

              <h2>
                {academyName}
              </h2>

              <p>
                Administrator: {adminName}
              </p>

            </div>

          </section>

        )}

        {/* ==================================================
            EDIT FORM
        ================================================== */}

        {showEditForm &&
          editingStudent && (

            <EditStudentForm
              student={editingStudent}
              onCancel={cancelEdit}
              onSave={saveEditedStudent}
            />

          )}

      </main>

    </div>
  );
}

export default App;