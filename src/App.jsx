import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import StudentCard from "./StudentCard";
import StudentForm from "./StudentForm";
import NotFound from "./NotFound";
import EditStudentForm from "./EditStudentForm";
import Dashboard from "./Dashboard";
import Attendance from "./Attendance";
import Settings from "./Settings";
import Reports from "./Reports";
import Students from "./Students";
import Home from "./Home";
import About from "./About";
import StudentDetails from "./StudentDetails";
import { fetchStudents } from "./services/studentApi";
import "./App.css";

function App() {
   const navigate = useNavigate();
    
  // ==================================================
  // STUDENTS
  // ==================================================

  const [students, setStudents] = useState([]);

  // ==================================================
  // LOADING
  // ==================================================

  const [loading, setLoading] = useState(true);

  // ==================================================
  // ERROR
  // ==================================================

  const [error, setError] = useState("");

  // ==================================================
  // SEARCH
  // ==================================================

  const [search, setSearch] = useState("");

  // ==================================================
  // EDIT
  // ==================================================

  const [editingStudent, setEditingStudent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // ==================================================
  // CLASS FILTER
  // ==================================================

  const [selectedClass, setSelectedClass] = useState("All");

  // ==================================================
  // ATTENDANCE
  // ==================================================

  const [attendance, setAttendance] = useState(() => {
    const savedAttendance = localStorage.getItem("attendance");

    return savedAttendance
      ? JSON.parse(savedAttendance)
      : {};
  });

  // ==================================================
  // ACTIVE PAGE
  // ==================================================

  const [activePage, setActivePage] = useState("Dashboard");

  // ==================================================
  // CLOCK
  // ==================================================

  const [currentTime, setCurrentTime] = useState(new Date());

  // ==================================================
  // SETTINGS
  // ==================================================

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
  // CLOCK EFFECT
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
  // LOAD STUDENTS ON START
  // ==================================================

  useEffect(() => {
    loadStudents();
  }, []);

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
  // MAIN APP
  // ==================================================
  const routerContent = (
  <Routes>
    <Route path="/" element={<Dashboard
  academyName={academyName}
  adminName={adminName}
  currentTime={currentTime}
  students={students}
  filteredStudents={filteredStudents}
  presentCount={presentCount}
  absentCount={absentCount}
  attendancePercentage={attendancePercentage}
  totalClasses={totalClasses}
  search={search}
  setSearch={setSearch}
  selectedClass={selectedClass}
  setSelectedClass={setSelectedClass}
  handleRefresh={handleRefresh}
  addStudent={addStudent}
  setActivePage={setActivePage}
  deleteStudent={deleteStudent}
  editStudent={editStudent}
/>} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route
      path="/students"
      element={
        <Students
          filteredStudents={filteredStudents}
          search={search}
          setSearch={setSearch}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
        />
      }
    />
    <Route
      path="/students/:id"
      element={<StudentDetails students={students} />}
    />
    <Route
  path="/attendance"
  element={
    <Attendance
      students={students}
      attendance={attendance}
      markAttendance={markAttendance}
      resetAttendance={resetAttendance}
      presentCount={presentCount}
      absentCount={absentCount}
      attendancePercentage={attendancePercentage}
    />
  }
/>
<Route
  path="/reports"
  element={
    <Reports
      students={students}
      attendance={attendance}
      presentCount={presentCount}
      absentCount={absentCount}
      attendancePercentage={attendancePercentage}
    />
  }
/>
<Route
  path="/settings"
  element={
    <Settings
      academyName={academyName}
      setAcademyName={setAcademyName}
      adminName={adminName}
      setAdminName={setAdminName}
    />
  }
/>
<Route path="*" element={<NotFound />} />
  
  </Routes>
);

  return (
  <div className="dashboard">

    <aside className="sidebar">

      <div className="brand">

        <div className="brand-icon">
          S
        </div>

        <div>
          <strong>{academyName}</strong>
          <span>Management</span>
        </div>

      </div>

      <nav className="navigation">

        <p className="nav-title">
          MAIN MENU
        </p>

        <button
  className="nav-item"
  onClick={() => navigate("/")}
>
  <span>▦</span>
  Dashboard
</button>

       <button
  className="nav-item"
  onClick={() => navigate("/students")}
>
  <span>♙</span>
  Students
</button>

        <button
  className="nav-item"
  onClick={() => navigate("/attendance")}
>
  <span>✓</span>
  Attendance
</button>

        <button
  className="nav-item"
  onClick={() => navigate("/reports")}
>
  <span>▤</span>
  Reports
</button>

        <button
  className="nav-item"
  onClick={() => navigate("/settings")}
>
  <span>⚙</span>
  Settings
</button>

      </nav>

      <div className="sidebar-bottom">

        <p>
          Student Manager
        </p>

        <small>
          React Day 4 Project
        </small>

      </div>

    </aside>

    <main className="main-content">

      {routerContent}


      {showEditForm && editingStudent && (
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