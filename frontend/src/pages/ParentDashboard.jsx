import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../hooks/useAuth";
import { useCollectionRealtime } from "../hooks/useRealtime";

function ParentDashboard() {
  const { user } = useAuthStore();
  
  // Real-time query for the parent's child (assuming parentId matches user.uid)
  const { data: students } = useCollectionRealtime("students", [['parentId', '==', user?.uid]]);
  const student = students.length > 0 ? students[0] : null;

  // Notifications for the parent
  const { data: notifications } = useCollectionRealtime("notifications", [['targetRole', 'in', ['all', 'parent']]]);

  const studentInfo = {
    name: student?.name || "No child assigned",
    className: student?.className || "-",
    attendance: "Pending",
    performance: "Pending"
  };

  return (
    <div className="app-container">

      {/* Sidebar */}

      <Sidebar role="parent" />

      {/* Main Content */}

      <div className="main-content">

        {/* Navbar */}

        <Navbar title="Parent Dashboard" />

        {/* Page Title */}

        <h1 className="page-title">
          Welcome Parent 👨‍👩‍👦
        </h1>

        {/* Student Overview */}

        <div className="grid grid-3">

          <div className="glass-card stat-card">
            <h3>Student Name</h3>
            <p style={{ fontSize: "24px" }}>
              {studentInfo.name}
            </p>
          </div>

          <div className="glass-card stat-card">
            <h3>Attendance</h3>
            <p>{studentInfo.attendance}</p>
          </div>

          <div className="glass-card stat-card">
            <h3>Performance</h3>
            <p>{studentInfo.performance}</p>
          </div>

        </div>

        {/* Student Details */}

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
            Student Information
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px"
            }}
          >

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              <h4>Class</h4>
              <p
                style={{
                  marginTop: "10px",
                  opacity: "0.8"
                }}
              >
                {studentInfo.className}
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              <h4>Attendance Status</h4>
              <p
                style={{
                  marginTop: "10px",
                  opacity: "0.8"
                }}
              >
                Excellent
              </p>
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)"
              }}
            >
              <h4>Academic Grade</h4>
              <p
                style={{
                  marginTop: "10px",
                  opacity: "0.8"
                }}
              >
                Outstanding
              </p>
            </div>

          </div>

        </div>

        {/* Notifications */}

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
            Notifications
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >

            {notifications.length === 0 ? (
               <div style={{ padding: "18px", borderRadius: "16px", background: "rgba(255,255,255,0.05)" }}>
                 No new notifications.
               </div>
            ) : (
              notifications.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "18px",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.05)"
                  }}
                >
                  {item.message || item.title || "Notification"}
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ParentDashboard;