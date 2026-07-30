import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { School, ArrowLeft, Check } from "lucide-react";

function AddClass() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    roomNumber: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.className || !formData.section) {
      alert("Please fill Class Name and Section");
      return;
    }

    try {
      await addDoc(collection(db, "classes"), formData);

      alert("Class Created Successfully!");

      setFormData({
        className: "",
        section: "",
        classTeacher: "",
        roomNumber: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to create class");
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Create Class" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE & BACK */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Create New Class & Section
          </h1>
          <button className="secondary-btn" onClick={() => navigate("/admin")}>
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>
        </div>

        {/* FORM */}
        <div className="card form-container" style={{ maxWidth: "600px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <School size={22} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Class Details Form
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Class Name / Grade *</label>
              <input
                type="text"
                name="className"
                placeholder="e.g. Grade 10"
                value={formData.className}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Section *</label>
              <input
                type="text"
                name="section"
                placeholder="e.g. Section A"
                value={formData.section}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Assigned Class Teacher</label>
              <input
                type="text"
                name="classTeacher"
                placeholder="Teacher Name"
                value={formData.classTeacher}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                name="roomNumber"
                placeholder="e.g. Room 204"
                value={formData.roomNumber}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button type="submit" className="primary-btn" style={{ flex: 1 }}>
                <Check size={18} />
                <span>Create Class Record</span>
              </button>
              <button type="button" className="secondary-btn" onClick={() => navigate("/admin")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClass;