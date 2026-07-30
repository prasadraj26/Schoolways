import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../hooks/useAuth";
import { useCollectionRealtime } from "../hooks/useRealtime";
import { BookOpen, Users, CalendarCheck, FileCheck, Clock, Activity } from "lucide-react";

function TeacherDashboard() {
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // CLASSES
  const { data: classes } = useCollectionRealtime(
    "classes",
    user?.uid ? [["teacherId", "==", user.uid]] : []
  );

  const classIds = classes.map((c) => c.id);

  // STUDENTS
  const { data: students } = useCollectionRealtime(
    "students",
    classIds.length > 0 ? [["classId", "in", classIds.slice(0, 10)]] : []
  );

  // ATTENDANCE
  const { data: attendance } = useCollectionRealtime(
    "attendance",
    user?.uid ? [["teacherId", "==", user.uid]] : []
  );

  // ASSIGNMENTS
  const { data: assignments } = useCollectionRealtime(
    "assignments",
    user?.uid ? [["teacherId", "==", user.uid]] : []
  );

  // ACTIVITIES
  const { data: activities } = useCollectionRealtime("activities");

  // ATTENDANCE %
  const attendancePercentage =
    attendance.length > 0
      ? Math.round(
          (attendance.filter((a) => a.status === "Present").length / attendance.length) * 100
        )
      : 0;

  // STATS
  const stats = [
    {
      title: "Classes Assigned",
      value: classes.length,
      icon: BookOpen
    },
    {
      title: "Total Students",
      value: students.length,
      icon: Users
    },
    {
      title: "Attendance Rate",
      value: `${attendancePercentage}%`,
      icon: CalendarCheck
    },
    {
      title: "Assignments",
      value: assignments.length,
      icon: FileCheck
    }
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="teacher" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Teacher Dashboard" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* TITLE */}
        <h1 className="page-title">Welcome Teacher</h1>

        {/* STATS */}
        <div className="grid grid-4">
          {stats.map((item, index) => {
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

        {/* TODAY'S SCHEDULE */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Clock size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Today's Schedule & Assigned Classes
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {classes.length === 0 ? (
              <div className="empty-state">
                <p>No classes assigned yet.</p>
              </div>
            ) : (
              classes.map((cls) => (
                <div key={cls.id} className="activity-card">
                  <BookOpen size={18} />
                  <span>{cls.name || cls.className || "Unnamed Class"}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RECENT ACTIVITIES */}
        <div className="card" style={{ marginTop: "24px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Activity size={20} color="var(--navy)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
              Recent Classroom Activity
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activities.length === 0 ? (
              <div className="empty-state">
                <p>No recent classroom activities logged.</p>
              </div>
            ) : (
              activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="activity-card">
                  <span>{activity.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;