import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Edit, ArrowLeft, Check } from "lucide-react";

function EditStudent() {
  const { id } = useParams();
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

  const fetchStudent = async () => {
    try {
      const docRef = doc(db, "students", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setFormData(snapshot.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "students", id);
      await updateDoc(docRef, formData);
      alert("Student Information Updated Successfully!");
      navigate("/manage-students");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Edit Student" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE & BACK */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 className="page-title" style={{ marginBottom: 0 }}>
            Edit Student Profile
          </h1>
          <button className="secondary-btn" onClick={() => navigate("/manage-students")}>
            <ArrowLeft size={16} />
            <span>Back to List</span>
          </button>
        </div>

        {/* FORM */}
        <div className="card form-container" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <Edit size={22} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Update Student Details
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <div className="form-group">
                <label>Student Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Class</label>
                <input
                  type="text"
                  name="className"
                  value={formData.className || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Parent / Guardian Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender || ""} onChange={handleChange}>
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
                rows="3"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <button type="submit" className="primary-btn" style={{ flex: 1 }}>
                <Check size={18} />
                <span>Save Changes</span>
              </button>
              <button type="button" className="secondary-btn" onClick={() => navigate("/manage-students")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;