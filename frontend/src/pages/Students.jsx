import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  addStudent,
  deleteStudent
} from "../services/studentService";
import { useCollectionRealtime } from "../hooks/useRealtime";

function Students() {

  // STATES

  const { data: studentsData } = useCollectionRealtime("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const students = studentsData.filter(s => {
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesClass = filterClass ? s.className === filterClass : true;
    return matchesSearch && matchesClass;
  });

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // ADD STUDENT

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      // VALIDATION

      if (
        !formData.name ||
        !formData.className ||
        !formData.roll
      ) {
        alert(
          "Please fill all fields"
        );
        return;
      }

      // SAVE TO FIRESTORE

      const response =
        await addStudent(formData);

      if (response.success) {

        alert(
          "Student Added ✅"
        );

        // Table is auto-refreshed via real-time hook

        // RESET FORM

        setFormData({
          name: "",
          className: "",
          roll: ""
        });

      } else {

        alert(
          "Failed to add student ❌"
        );

      }

    };

  // DELETE STUDENT

  const handleDelete =
    async (id) => {

      const response =
        await deleteStudent(id);

    };

  return (
    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="admin" />

      {/* MAIN */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Students Management" />

        {/* TITLE */}

        <h1 className="page-title">
          Students
        </h1>

        {/* STATS */}

        <div className="grid grid-3">

          <div className="glass-card stat-card">

            <h3>Total Students</h3>

            <p>
              {students.length}
            </p>

          </div>

        </div>

        {/* FORM */}

        <div
          className="glass-card form-container"
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Add Student
          </h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            {/* CLASS */}

            <div className="form-group">

              <input
                type="text"
                name="className"
                placeholder="Class"
                value={formData.className}
                onChange={handleChange}
              />

            </div>

            {/* ROLL */}

            <div className="form-group">

              <input
                type="text"
                name="roll"
                placeholder="Roll Number"
                value={formData.roll}
                onChange={handleChange}
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="primary-btn"
              style={{
                width: "100%"
              }}
            >
              Add Student
            </button>

          </form>

        </div>

        {/* TABLE */}

        <div
          className="glass-card"
          style={{
            marginTop: "30px",
            padding: "24px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Students List
          </h2>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Search by Name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Filter by Class..." 
              value={filterClass} 
              onChange={(e) => setFilterClass(e.target.value)} 
            />
          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {students.map(
                  (student) => (

                    <tr
                      key={student.id}
                    >

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.className}
                      </td>

                      <td>
                        {student.roll}
                      </td>

                      <td>

                        <button
                          className="primary-btn"
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Students;