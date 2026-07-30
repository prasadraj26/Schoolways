import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getStudents } from "../services/studentService";
import { addMarks, getMarks, deleteMarks } from "../services/marksService";
import { Award, Plus, Trash2, BookOpen, User } from "lucide-react";

function Marks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    subject: "",
    marks: ""
  });

  const fetchStudents = async () => {
    const response = await getStudents();
    if (response.success) {
      setStudents(response.data);
    }
  };

  const fetchMarks = async () => {
    const response = await getMarks();
    if (response.success) {
      setRecords(response.data);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchMarks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStudentSelect = (e) => {
    const selectedStudent = students.find((s) => s.id === e.target.value);
    if (selectedStudent) {
      setFormData({
        ...formData,
        studentId: selectedStudent.id,
        studentName: selectedStudent.name
      });
    } else {
      setFormData({
        ...formData,
        studentId: "",
        studentName: ""
      });
    }
  };

  const calculateGrade = (marks) => {
    const num = Number(marks);
    if (num >= 90) return "A+";
    if (num >= 75) return "A";
    if (num >= 60) return "B";
    if (num >= 40) return "C";
    return "F";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.subject || !formData.marks) {
      alert("Please fill all required fields");
      return;
    }

    const response = await addMarks({
      ...formData,
      marks: Number(formData.marks),
      grade: calculateGrade(formData.marks),
      createdAt: new Date()
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

  const handleDelete = async (id) => {
    if (window.confirm("Delete this marks entry?")) {
      await deleteMarks(id);
      fetchMarks();
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="teacher" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Marks Management" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE */}
        <h1 className="page-title">Student Marks & Performance</h1>

        {/* FORM */}
        <div className="card form-container" style={{ maxWidth: "100%", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Award size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Record Marks & Grade
            </h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", alignItems: "end" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Select Student</label>
              <select onChange={handleStudentSelect} value={formData.studentId} required>
                <option value="">-- Choose Student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.className})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="e.g. Mathematics"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Score / Marks</label>
              <input
                type="number"
                name="marks"
                placeholder="e.g. 85"
                value={formData.marks}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="primary-btn" style={{ height: "45px" }}>
              <Plus size={18} />
              <span>Save Marks</span>
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "16px" }}>
            Marks Records Ledger
          </h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Marks Score</th>
                  <th>Calculated Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "var(--navy-muted)", padding: "30px" }}>
                      No marks recorded yet.
                    </td>
                  </tr>
                ) : (
                  records.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: "600" }}>{item.studentName}</td>
                      <td>{item.subject}</td>
                      <td style={{ fontWeight: "700" }}>{item.marks}</td>
                      <td>
                        <span className="badge badge-navy">
                          Grade {item.grade}
                        </span>
                      </td>
                      <td>
                        <button className="btn-danger" onClick={() => handleDelete(item.id)}>
                          <Trash2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks;