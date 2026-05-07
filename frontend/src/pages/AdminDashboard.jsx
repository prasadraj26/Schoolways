import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminDashboard() {

  const stats = [
    {
      title: "Total Students",
      value: "1,248"
    },
    {
      title: "Teachers",
      value: "86"
    },
    {
      title: "Attendance",
      value: "92%"
    },
    {
      title: "Reports Generated",
      value: "320"
    }
  ];

  return (
    <div className="app-container">

      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar title="Admin Dashboard" />

        {/* Page Title */}
        <h1 className="page-title">
          Welcome Admin 👋
        </h1>

        {/* Stats Cards */}
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

        {/* Recent Activity */}

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
                padding: "16px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              ✅ Attendance reports updated
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📚 New students added to Class 10
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              📝 Midterm results published
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;