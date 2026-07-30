import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getStudents } from "../services/studentService";
import { saveAttendance, getAttendanceByDate } from "../services/attendanceService";
import { Calendar, Save, Eye, RefreshCw, CheckCircle, XCircle } from "lucide-react";

function Attendance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchStudents = async () => {
    const response = await getStudents();
    if (response.success) {
      const updated = response.data.map((student) => ({
        ...student,
        status: "Present"
      }));
      setStudents(updated);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const toggleAttendance = (id) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          status: student.status === "Present" ? "Absent" : "Present"
        };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleSaveAttendance = async () => {
    for (const student of students) {
      await saveAttendance({
        studentId: student.id,
        studentName: student.name || student.studentName,
        className: student.className,
        roll: student.roll,
        status: student.status,
        date: attendanceDate
      });
    }
    alert("Attendance Saved Successfully");
  };

  const handleViewAttendance = async () => {
    const response = await getAttendanceByDate(attendanceDate);
    if (response.success && response.data.length > 0) {
      setStudents(response.data);
    } else {
      alert("No attendance records found for selected date");
    }
  };

  const presentCount = students.filter((s) => s.status === "Present").length;
  const absentCount = students.filter((s) => s.status === "Absent").length;

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="teacher" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Attendance Management" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE */}
        <h1 className="page-title">Daily Attendance Tracking</h1>

        {/* CONTROLS BAR */}
        <div className="card" style={{ padding: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", minWidth: "200px" }}>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                style={{ paddingLeft: "38px" }}
              />
              <Calendar size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--navy-muted)" }} />
            </div>

            <button className="primary-btn" onClick={handleSaveAttendance}>
              <Save size={16} />
              <span>Save Attendance</span>
            </button>

            <button className="secondary-btn" onClick={handleViewAttendance}>
              <Eye size={16} />
              <span>View Records</span>
            </button>

            <button className="outline-btn" onClick={fetchStudents}>
              <RefreshCw size={16} />
              <span>Reset List</span>
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-3">
          <div className="card stat-card">
            <h3>Total Class Roster</h3>
            <p>{students.length}</p>
          </div>

          <div className="card stat-card" style={{ borderLeftColor: "var(--status-present-text)" }}>
            <h3>Total Present</h3>
            <p style={{ color: "var(--status-present-text)" }}>{presentCount}</p>
          </div>

          <div className="card stat-card" style={{ borderLeftColor: "var(--status-absent-text)" }}>
            <h3>Total Absent</h3>
            <p style={{ color: "var(--status-absent-text)" }}>{absentCount}</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "16px" }}>
            Mark Attendance List ({attendanceDate})
          </h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Attendance Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "var(--navy-muted)", padding: "30px" }}>
                      No students listed.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => {
                    const isPresent = student.status === "Present";
                    return (
                      <tr key={student.id}>
                        <td style={{ fontWeight: "600" }}>
                          {student.name || student.studentName}
                        </td>
                        <td>{student.className}</td>
                        <td>{student.roll}</td>
                        <td>
                          <span className={`badge ${isPresent ? "badge-present" : "badge-absent"}`}>
                            {isPresent ? <CheckCircle size={14} /> : <XCircle size={14} />}
                            <span>{student.status}</span>
                          </span>
                        </td>
                        <td>
                          <button
                            className="secondary-btn"
                            style={{ padding: "6px 12px", fontSize: "13px" }}
                            onClick={() => toggleAttendance(student.id)}
                          >
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;