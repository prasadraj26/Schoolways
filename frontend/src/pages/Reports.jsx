import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useCollectionRealtime } from "../hooks/useRealtime";
import { FileText, Download, Award, Sparkles, BarChart3, Users } from "lucide-react";

function Reports() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: students } = useCollectionRealtime("students");
  const { data: attendance } = useCollectionRealtime("attendance");

  const reportData = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users
    },
    {
      title: "Attendance Log Entries",
      value: attendance.length,
      icon: BarChart3
    },
    {
      title: "System Report Status",
      value: "Ready",
      icon: FileText
    }
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Schoolways Attendance & Performance Report", 14, 15);

    const tableData = students.map((s) => [s.name, s.className || "N/A", "90%"]);

    doc.autoTable({
      head: [["Student Name", "Class", "Est. Attendance"]],
      body: tableData,
      startY: 25
    });

    doc.save("attendance_report.pdf");
  };

  const topStudents = [
    { id: 1, name: "Arun Kumar", className: "10-A", percentage: "96%" },
    { id: 2, name: "Priya", className: "9-B", percentage: "93%" },
    { id: 3, name: "Rahul", className: "8-C", percentage: "90%" }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar title="Reports & Analytics" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Title */}
        <h1 className="page-title">Reports & Analytics Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-3">
          {reportData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="card stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                  <div className="stat-card-icon">
                    <IconComponent size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reports Actions */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Download size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Generate & Export Reports
            </h2>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="primary-btn" onClick={generatePDF}>
              <FileText size={16} />
              <span>Export Attendance PDF</span>
            </button>

            <button className="secondary-btn">
              <Download size={16} />
              <span>Export Marks Report</span>
            </button>

            <button className="outline-btn">
              <Download size={16} />
              <span>Download Excel Summary</span>
            </button>
          </div>
        </div>

        {/* Top Students */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Award size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Top Performing Students
            </h2>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Performance Index</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((student) => (
                  <tr key={student.id}>
                    <td style={{ fontWeight: "600" }}>{student.name}</td>
                    <td>{student.className}</td>
                    <td>
                      <span className="badge badge-navy">
                        {student.percentage} Overall
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Sparkles size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Automated System Insights
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="activity-card">
              <span>Attendance improved by 8% overall across senior classes this month.</span>
            </div>

            <div className="activity-card">
              <span>Class 10-A has maintained the highest academic performance index.</span>
            </div>

            <div className="activity-card">
              <span>12 students currently fall below the 75% attendance threshold.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;