import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TeacherDashboard() {

  const stats = [
    {
      title: "Classes Assigned",
      value: "6"
    },
    {
      title: "Students",
      value: "240"
    },
    {
      title: "Attendance Updated",
      value: "91%"
    },
    {
      title: "Assignments Uploaded",
      value: "18"
    }
  ];

  return (
    <div className="app-container">

      {/* Sidebar */}

      <Sidebar role="teacher" />

      {/* Main Content */}

      <div className="main-content">

        {/* Navbar */}

        <Navbar title="Teacher Dashboard" />

        {/* Title */}

        <h1 className="page-title">
          Welcome Teacher 👩‍🏫
        </h1>

        {/* Statistics */}

        <div className="grid grid-3">

          {stats.map((item, index) => (

            <div
              key={index}
              className="glass-card stat-card"
            >

              <h3>{item.title}</h3>
              <p>{item.value}</p>

            </div>

          ))}

        </div>

        {/* Today's Schedule */}

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
            Today's Schedule
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
              📘 Mathematics — Class 10-A — 9:00 AM
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📗 Science — Class 9-B — 11:00 AM
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📙 English — Class 8-C — 2:00 PM
            </div>

          </div>

        </div>

        {/* Recent Activities */}

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
            Recent Activities
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
              ✅ Attendance marked for Class 10-A
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📝 Marks updated for Midterm Examination
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📂 Assignment uploaded for Science
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TeacherDashboard;