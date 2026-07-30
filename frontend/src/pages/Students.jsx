import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { addStudent, deleteStudent } from "../services/studentService";
import { useCollectionRealtime } from "../hooks/useRealtime";
import { Search, Filter, Plus, Trash2, Users, UserPlus } from "lucide-react";

function Students() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: studentsData } = useCollectionRealtime("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    className: "",
    roll: ""
  });

  const students = studentsData.filter((s) => {
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesClass = filterClass ? s.className?.toLowerCase().includes(filterClass.toLowerCase()) : true;
    return matchesSearch && matchesClass;
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.className || !formData.roll) {
      alert("Please fill all fields");
      return;
    }

    const response = await addStudent(formData);

    if (response.success) {
      alert("Student Added Successfully");
      setFormData({
        name: "",
        className: "",
        roll: ""
      });
    } else {
      alert("Failed to add student");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Students Management" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE */}
        <h1 className="page-title">Students Overview</h1>

        {/* STATS */}
        <div className="grid grid-3">
          <div className="card stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3>Total Registered Students</h3>
                <p>{studentsData.length}</p>
              </div>
              <div className="stat-card-icon">
                <Users size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* ADD STUDENT FORM */}
        <div className="card form-container" style={{ marginTop: "24px", maxWidth: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <UserPlus size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Quick Add Student
            </h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", alignItems: "end" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Class</label>
              <input
                type="text"
                name="className"
                placeholder="e.g. 10-A"
                value={formData.className}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Roll Number</label>
              <input
                type="text"
                name="roll"
                placeholder="Roll No."
                value={formData.roll}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="primary-btn" style={{ height: "45px" }}>
              <Plus size={18} />
              <span>Add Student</span>
            </button>
          </form>
        </div>

        {/* TABLE & FILTERS */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "16px" }}>
            Students List
          </h2>

          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
              <input
                type="text"
                placeholder="Search by Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: "38px" }}
              />
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--navy-muted)" }} />
            </div>

            <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
              <input
                type="text"
                placeholder="Filter by Class..."
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                style={{ paddingLeft: "38px" }}
              />
              <Filter size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--navy-muted)" }} />
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "var(--navy-muted)", padding: "30px" }}>
                      No students found matching search criteria.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td style={{ fontWeight: "600" }}>{student.name}</td>
                      <td>{student.className}</td>
                      <td>{student.roll}</td>
                      <td>
                        <button className="btn-danger" onClick={() => handleDelete(student.id)}>
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

export default Students;