import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Users, Search, Edit, Trash2, UserPlus } from "lucide-react";

function ManageStudents() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "students"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student record?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        fetchStudents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Manage Students" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE & ACTIONS */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Manage Student Records
          </h1>
          <button className="primary-btn" onClick={() => navigate("/add-student")}>
            <UserPlus size={16} />
            <span>Add New Student</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="card" style={{ padding: "20px", marginBottom: "24px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Search Student by Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: "38px" }}
            />
            <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--navy-muted)" }} />
          </div>
        </div>

        {/* TABLE */}
        <div className="card" style={{ padding: "24px" }}>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Parent Name</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", color: "var(--navy-muted)", padding: "30px" }}>
                      No student records found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td style={{ fontWeight: "600" }}>{student.name}</td>
                      <td>{student.className}</td>
                      <td>{student.roll}</td>
                      <td>{student.parentName || "-"}</td>
                      <td>{student.phone || "-"}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="outline-btn"
                            style={{ padding: "6px 12px", fontSize: "13px" }}
                            onClick={() => navigate(`/edit-student/${student.id}`)}
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>

                          <button className="btn-danger" onClick={() => handleDelete(student.id)}>
                            <Trash2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                            Delete
                          </button>
                        </div>
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

export default ManageStudents;