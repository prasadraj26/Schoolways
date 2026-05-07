import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Reports() {

  const reportData = [
    {
      title: "Total Students",
      value: "1,248"
    },
    {
      title: "Average Attendance",
      value: "92%"
    },
    {
      title: "Top Performing Class",
      value: "10-A"
    },
    {
      title: "Reports Generated",
      value: "320"
    }
  ];

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

            <button className="primary-btn">
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