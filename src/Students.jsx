import { useState } from "react";
import StudentCard from "./StudentCard";

function Students({
  filteredStudents,
  search,
  setSearch,
  selectedClass,
  setSelectedClass,
  deleteStudent,
  editStudent,
}) {
  const [sortBy, setSortBy] = useState("default");

  const sortedStudents = [...filteredStudents].sort(
    (a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      if (sortBy === "age-asc") {
        return a.age - b.age;
      }

      if (sortBy === "age-desc") {
        return b.age - a.age;
      }

      return 0;
    }
  );

  return (
    <section className="students-section">

      <div className="section-heading">
        <div>
          <span>STUDENT DIRECTORY</span>

          <h2>All Students 👩‍🎓</h2>
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
            setSelectedClass(e.target.value)
          }
        >
          <option value="All">
            All Classes
          </option>

          <option value="8th">8th</option>
          <option value="9th">9th</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="default">
            Sort Students
          </option>

          <option value="name-asc">
            Name A-Z
          </option>

          <option value="name-desc">
            Name Z-A
          </option>

          <option value="age-asc">
            Age Low-High
          </option>

          <option value="age-desc">
            Age High-Low
          </option>
        </select>

      </div>

      {sortedStudents.length > 0 ? (

        <div className="student-grid">

          {sortedStudents.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              className={student.className}
              age={student.age}
              onDelete={() =>
                deleteStudent(student.id)
              }
              onEdit={() =>
                editStudent(student.id)
              }
            />
          ))}

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
  );
}

export default Students;