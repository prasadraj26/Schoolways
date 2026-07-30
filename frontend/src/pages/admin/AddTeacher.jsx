import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { UserCheck, ArrowLeft, Check } from "lucide-react";

function AddTeacher() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    assignedClass: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject) {
      alert("Please fill required fields (Name, Email, Subject)");
      return;
    }

    try {
      await addDoc(collection(db, "teachers"), formData);

      alert("Teacher Added Successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        assignedClass: "",
        phone: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add teacher");
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Add Teacher" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE & BACK */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Register New Teacher
          </h1>
          <button className="secondary-btn" onClick={() => navigate("/manage-teachers")}>
            <ArrowLeft size={16} />
            <span>Manage Teachers</span>
          </button>
        </div>

        {/* FORM */}
        <div className="card form-container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <UserCheck size={22} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Faculty Information Form
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div className="form-group">
                <label>Teacher Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="teacher@schoolways.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Primary Subject *</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Mathematics"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Assigned Class</label>
                <input
                  type="text"
                  name="assignedClass"
                  placeholder="e.g. 10-A"
                  value={formData.assignedClass}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <button type="submit" className="primary-btn" style={{ flex: 1 }}>
                <Check size={18} />
                <span>Save Teacher Record</span>
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

export default AddTeacher;