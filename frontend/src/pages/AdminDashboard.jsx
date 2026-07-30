import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useCollectionRealtime } from "../hooks/useRealtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  Users,
  UserCheck,
  TrendingUp,
  School,
  UserPlus,
  PlusCircle,
  Settings,
  Bell,
  FileText,
  Activity,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // REALTIME DATA
  const { data: students } = useCollectionRealtime("students");
  const { data: teachers } = useCollectionRealtime("teachers");
  const { data: attendance } = useCollectionRealtime("attendance");
  const { data: classes } = useCollectionRealtime("classes");
  const { data: notifications } = useCollectionRealtime("notifications");
  const { data: parents } = useCollectionRealtime("parents");

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
      title: "Total Students",
      value: students.length,
      icon: Users
    },
    {
      title: "Total Teachers",
      value: teachers.length,
      icon: UserCheck
    },
    {
      title: "Attendance Rate",
      value: `${attendancePercentage}%`,
      icon: TrendingUp
    },
    {
      title: "Total Classes",
      value: classes.length,
      icon: School
    }
  ];

  // CHART DATA (RESTYLED WITH ONLY NAVY)
  const chartData = [
    { name: "Mon", attendance: 95 },
    { name: "Tue", attendance: 92 },
    { name: "Wed", attendance: 88 },
    { name: "Thu", attendance: 94 },
    { name: "Fri", attendance: 85 }
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar role="admin" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar title="Admin Dashboard" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* PAGE TITLE */}
        <h1 className="page-title">
          Dashboard Overview
        </h1>

        {/* STAT CARDS */}
        <div className="grid grid-4">
          {stats.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div key={index} className="card stat-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                  <div className="stat-card-icon">
                    <IconComp size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ANALYTICS & QUICK ACTIONS */}
        <div className="grid grid-2" style={{ marginTop: "24px" }}>
          {/* ANALYTICS */}
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <Activity size={20} color="var(--navy)" />
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)" }}>
                Attendance Trends
              </h2>
            </div>

            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(10, 31, 68, 0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--navy-muted)" fontSize={12} tickLine={false} />
                  <YAxis stroke="var(--navy-muted)" fontSize={12} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(10, 31, 68, 0.04)" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid var(--navy-border)",
                      background: "var(--white)",
                      boxShadow: "var(--shadow-md)",
                      color: "var(--navy)"
                    }}
                  />
                  <Bar dataKey="attendance" fill="var(--navy)" radius={[6, 6, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ADMIN ACTIONS */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "20px" }}>
              Admin Actions
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              <button className="primary-btn" onClick={() => navigate("/add-teacher")}>
                <UserPlus size={16} />
                <span>Add Teacher</span>
              </button>

              <button className="primary-btn" onClick={() => navigate("/add-student")}>
                <UserPlus size={16} />
                <span>Add Student</span>
              </button>

              <button className="secondary-btn" onClick={() => navigate("/add-class")}>
                <PlusCircle size={16} />
                <span>Create Class</span>
              </button>

              <button className="secondary-btn" onClick={() => navigate("/manage-teachers")}>
                <Settings size={16} />
                <span>Manage Teachers</span>
              </button>

              <button className="secondary-btn" onClick={() => navigate("/manage-students")}>
                <Settings size={16} />
                <span>Manage Students</span>
              </button>

              <button className="secondary-btn" onClick={() => navigate("/reports")}>
                <FileText size={16} />
                <span>System Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* REPORTS & RECENT ACTIVITIES */}
        <div className="grid grid-2" style={{ marginTop: "24px" }}>
          {/* SYSTEM SUMMARY */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "16px" }}>
              System Alerts
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="activity-card">
                <Bell size={18} />
                <div>
                  <div style={{ fontWeight: "600" }}>System Notifications</div>
                  <div style={{ fontSize: "12px", color: "var(--navy-muted)" }}>{notifications.length} pending updates</div>
                </div>
              </div>

              <div className="activity-card">
                <Users size={18} />
                <div>
                  <div style={{ fontWeight: "600" }}>Parent Registrations</div>
                  <div style={{ fontSize: "12px", color: "var(--navy-muted)" }}>{parents.length} accounts connected</div>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITIES */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--navy)", marginBottom: "16px" }}>
              Recent Logged Activities
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="activity-card">
                <CheckCircle2 size={18} color="var(--navy)" />
                <span>Daily attendance record saved by system</span>
              </div>

              <div className="activity-card">
                <CheckCircle2 size={18} color="var(--navy)" />
                <span>Teacher subject allocations updated</span>
              </div>

              <div className="activity-card">
                <CheckCircle2 size={18} color="var(--navy)" />
                <span>Exam term results published for Class 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;