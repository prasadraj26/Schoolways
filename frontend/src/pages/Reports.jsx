import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useCollectionRealtime } from "../hooks/useRealtime";

function Reports() {

  const { data: students } = useCollectionRealtime("students");
  const { data: attendance } = useCollectionRealtime("attendance");

  const reportData = [
    {
      title: "Total Students",
      value: students.length
    },
    {
      title: "Attendance Records",
      value: attendance.length
    },
    {
      title: "Reports Generated",
      value: "Ready"
    }
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Schoolways Attendance Report", 14, 15);
    
    const tableData = students.map(s => [s.name, s.className || "N/A", "90%"]);
    
    doc.autoTable({
      head: [['Student Name', 'Class', 'Est. Attendance']],
      body: tableData,
      startY: 25,
    });
    
    doc.save("attendance_report.pdf");
  };

  const topStudents = [
    {
      id: 1,
      name: "Arun Kumar",
      className: "10-A",
      percentage: "96%"
    },
    {
      id: 2,
      name: "Priya",
      className: "9-B",
      percentage: "93%"
    },
    {
      id: 3,
      name: "Rahul",
      className: "8-C",
      percentage: "90%"
    }
  ];

  return (
    <div className="app-container">

      {/* Sidebar */}

      <Sidebar role="admin" />

      {/* Main Content */}

      <div className="main-content">

        {/* Navbar */}

        <Navbar title="Reports & Analytics" />

        {/* Title */}

        <h1 className="page-title">
          Reports Overview
        </h1>

        {/* Stats Cards */}

        <div className="grid grid-3">

          {reportData.map((item, index) => (

            <div
              key={index}
              className="glass-card stat-card"
            >
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>

          ))}

        </div>

        {/* Reports Actions */}

        <div
          className="glass-card"
          style={{
            marginTop: "30px",
            padding: "24px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Generate Reports
          </h2>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}
          >

            <button className="primary-btn" onClick={generatePDF}>
              Export Attendance PDF
            </button>

            <button className="primary-btn">
              Export Marks Report
            </button>

            <button className="primary-btn">
              Download Excel Sheet
            </button>

          </div>

        </div>

        {/* Top Students */}

        <div
          className="glass-card"
          style={{
            marginTop: "30px",
            padding: "24px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            Top Performing Students
          </h2>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Performance</th>
                </tr>

              </thead>

              <tbody>

                {topStudents.map((student) => (

                  <tr key={student.id}>

                    <td>{student.name}</td>

                    <td>{student.className}</td>

                    <td>

                      <span
                        style={{
                          padding: "8px 14px",
                          borderRadius: "12px",
                          background: "rgba(34,197,94,0.2)",
                          color: "#22c55e",
                          fontWeight: "600"
                        }}
                      >
                        {student.percentage}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Insights */}

        <div
          className="glass-card"
          style={{
            marginTop: "30px",
            padding: "24px"
          }}
        >

          <h2
            style={{
              marginBottom: "20px"
            }}
          >
            AI Insights
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📈 Attendance improved by 8% this month.
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              🏆 Class 10-A has the highest overall performance.
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              ⚠️ 12 students have attendance below 75%.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Reports;