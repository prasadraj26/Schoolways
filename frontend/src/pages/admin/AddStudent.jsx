import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { UserPlus, ArrowLeft, Check } from "lucide-react";

function AddStudent() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    className: "",
    roll: "",
    parentName: "",
    phone: "",
    gender: "",
    address: ""
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
      alert("Please fill required fields (Name, Class, Roll Number)");
      return;
    }

    try {
      await addDoc(collection(db, "students"), {
        ...formData,
        createdAt: new Date()
      });

      alert("Student Added Successfully!");

      setFormData({
        name: "",
        className: "",
        roll: "",
        parentName: "",
        phone: "",
        gender: "",
        address: ""
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add student");
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Add Student" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE & BACK BUTTON */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Register New Student
          </h1>
          <button className="secondary-btn" onClick={() => navigate("/manage-students")}>
            <ArrowLeft size={16} />
            <span>Manage Students</span>
          </button>
        </div>

        {/* FORM */}
        <div className="card form-container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <UserPlus size={22} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Student Information Form
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div className="form-group">
                <label>Student Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Class / Section *</label>
                <input
                  type="text"
                  name="className"
                  placeholder="e.g. 10-A"
                  value={formData.className}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Roll Number *</label>
                <input
                  type="text"
                  name="roll"
                  placeholder="e.g. 101"
                  value={formData.roll}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent / Guardian Name</label>
                <input
                  type="text"
                  name="parentName"
                  placeholder="Parent Name"
                  value={formData.parentName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Contact Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Residential Address</label>
              <textarea
                name="address"
                placeholder="Full Street Address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <button type="submit" className="primary-btn" style={{ flex: 1 }}>
                <Check size={18} />
                <span>Save Student Record</span>
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

export default AddStudent;