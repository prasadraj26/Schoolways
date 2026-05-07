import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  addStudent,
  getStudents,
  deleteStudent
} from "../services/studentService";

function Students() {

  // STATES

  const [students, setStudents] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      className: "",
      roll: ""
    });

  // FETCH STUDENTS

  const fetchStudents =
    async () => {

      const response =
        await getStudents();

      if (response.success) {

        setStudents(response.data);

      } else {

        console.log(
          "Fetch Failed"
        );

      }

    };

  // LOAD ON START

  useEffect(() => {
    fetchStudents();
  }, []);

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

        // REFRESH TABLE

        fetchStudents();

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

      if (response.success) {

        fetchStudents();

      }

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