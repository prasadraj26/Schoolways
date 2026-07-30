import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { UserCheck, Search, Trash2, UserPlus } from "lucide-react";

function ManageTeachers() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTeachers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "teachers"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher record?")) {
      try {
        await deleteDoc(doc(db, "teachers", id));
        fetchTeachers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Manage Teachers" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE & ACTIONS */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Faculty & Teachers Directory
          </h1>
          <button className="primary-btn" onClick={() => navigate("/add-teacher")}>
            <UserPlus size={16} />
            <span>Add New Teacher</span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="card" style={{ padding: "20px", marginBottom: "24px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Search Teacher by Name..."
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
                  <th>Teacher Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Assigned Class</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", color: "var(--navy-muted)", padding: "30px" }}>
                      No teacher records found.
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td style={{ fontWeight: "600" }}>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.subject}</td>
                      <td>{teacher.assignedClass || "-"}</td>
                      <td>{teacher.phone || "-"}</td>
                      <td>
                        <button className="btn-danger" onClick={() => handleDelete(teacher.id)}>
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

export default ManageTeachers;