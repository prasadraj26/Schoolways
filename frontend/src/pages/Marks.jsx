import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getStudents
} from "../services/studentService";

import {
  addMarks,
  getMarks,
  deleteMarks
} from "../services/marksService";

function Marks() {

  const [students, setStudents] =
    useState([]);

  const [records, setRecords] =
    useState([]);

  const [formData, setFormData] =
    useState({
      studentId: "",
      studentName: "",
      subject: "",
      marks: ""
    });

  // FETCH STUDENTS

  const fetchStudents = async () => {

    const response =
      await getStudents();

    if (response.success) {
      setStudents(response.data);
    }

  };

  // FETCH MARKS

  const fetchMarks = async () => {

    const response =
      await getMarks();

    if (response.success) {
      setRecords(response.data);
    }

  };

  useEffect(() => {

    fetchStudents();
    fetchMarks();

  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // SELECT STUDENT

  const handleStudentSelect = (e) => {

    const selectedStudent =
      students.find(
        (s) => s.id === e.target.value
      );

    setFormData({
      ...formData,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name
    });

  };

  // GRADE

  const calculateGrade = (marks) => {

    if (marks >= 90) return "A+";
    if (marks >= 75) return "A";
    if (marks >= 60) return "B";
    if (marks >= 40) return "C";

    return "F";

  };

  // SAVE MARKS

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response =
      await addMarks({
        ...formData,
        marks:
          Number(formData.marks),
        grade:
          calculateGrade(
            formData.marks
          ),
        createdAt:
          new Date()
      });

    if (response.success) {

      fetchMarks();

      setFormData({
        studentId: "",
        studentName: "",
        subject: "",
        marks: ""
      });

    }

  };

  // DELETE

  const handleDelete = async (
    id
  ) => {

    await deleteMarks(id);

    fetchMarks();

  };

  return (
    <div className="app-container">

      <Sidebar role="teacher" />

      <div className="main-content">

        <Navbar title="Marks Management" />

        <h1 className="page-title">
          Student Marks
        </h1>

        {/* FORM */}

        <div
          className="glass-card form-container"
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Add Marks
          </h2>

          <form onSubmit={handleSubmit}>

            {/* STUDENT */}

            <div className="form-group">

              <select
                onChange={
                  handleStudentSelect
                }
                required
              >

                <option value="">
                  Select Student
                </option>

                {students.map(
                  (student) => (

                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* SUBJECT */}

            <div className="form-group">

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>

            {/* MARKS */}

            <div className="form-group">

              <input
                type="number"
                name="marks"
                placeholder="Marks"
                value={formData.marks}
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{
                width: "100%"
              }}
            >
              Save Marks
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
            Marks Records
          </h2>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {records.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.studentName}
                    </td>

                    <td>
                      {item.subject}
                    </td>

                    <td>
                      {item.marks}
                    </td>

                    <td>

                      <span
                        style={{
                          padding:
                            "8px 14px",
                          borderRadius:
                            "12px",
                          background:
                            "rgba(37,99,235,0.2)",
                          color:
                            "#60a5fa",
                          fontWeight:
                            "600"
                        }}
                      >
                        {item.grade}
                      </span>

                    </td>

                    <td>

                      <button
                        className="primary-btn"
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Marks;