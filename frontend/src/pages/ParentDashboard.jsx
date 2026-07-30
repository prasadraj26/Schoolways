import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../hooks/useAuth";
import { useCollectionRealtime } from "../hooks/useRealtime";
import { User, CalendarCheck, Award, Bell, BookOpen, Info } from "lucide-react";

function ParentDashboard() {
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Real-time query for the parent's child (assuming parentId matches user.uid)
  const { data: students } = useCollectionRealtime(
    "students",
    user?.uid ? [["parentId", "==", user.uid]] : []
  );
  const student = students.length > 0 ? students[0] : null;

  // Notifications for the parent
  const { data: notifications } = useCollectionRealtime(
    "notifications",
    [["targetRole", "in", ["all", "parent"]]]
  );

  const studentInfo = {
    name: student?.name || "Child Record",
    className: student?.className || "Class 10-A",
    attendance: "94%",
    performance: "Outstanding"
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar role="parent" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar title="Parent Dashboard" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Title */}
        <h1 className="page-title">Parent Overview</h1>

        {/* Student Overview Stats */}
        <div className="grid grid-3">
          <div className="card stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3>Student Name</h3>
                <p style={{ fontSize: "22px" }}>{studentInfo.name}</p>
              </div>
              <div className="stat-card-icon">
                <User size={20} />
              </div>
            </div>
          </div>

          <div className="card stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3>Overall Attendance</h3>
                <p>{studentInfo.attendance}</p>
              </div>
              <div className="stat-card-icon">
                <CalendarCheck size={20} />
              </div>
            </div>
          </div>

          <div className="card stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3>Academic Rank</h3>
                <p style={{ fontSize: "22px" }}>{studentInfo.performance}</p>
              </div>
              <div className="stat-card-icon">
                <Award size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Student Information Grid */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Info size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Student Information & Progress
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <div className="activity-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
              <div style={{ fontSize: "12px", color: "var(--navy-muted)", fontWeight: "600" }}>ASSIGNED CLASS</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>{studentInfo.className}</div>
            </div>

            <div className="activity-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
              <div style={{ fontSize: "12px", color: "var(--navy-muted)", fontWeight: "600" }}>ATTENDANCE STATUS</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>Regular (Above 90%)</div>
            </div>

            <div className="activity-card" style={{ flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
              <div style={{ fontSize: "12px", color: "var(--navy-muted)", fontWeight: "600" }}>ACADEMIC STANDING</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>Top Tier</div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Bell size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              School Broadcasts & Notifications
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {notifications.length === 0 ? (
              <div className="activity-card">
                <span>Parents meeting scheduled for upcoming Friday at 10:00 AM.</span>
              </div>
            ) : (
              notifications.map((item, index) => (
                <div key={index} className="activity-card">
                  <Bell size={16} />
                  <span>{item.message || item.title || "School Notification"}</span>
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