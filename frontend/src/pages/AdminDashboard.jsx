import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useCollectionRealtime } from "../hooks/useRealtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
function AdminDashboard() {

  // NAVIGATION

  const navigate =
    useNavigate();

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

          (
            attendance.filter(
              (a) =>
                a.status === "Present"
            ).length /

            attendance.length

          ) * 100

        )

      : 0;

  // LOW ATTENDANCE

  const lowAttendance =

    attendance.filter(
      (a) => a.status === "Absent"
    ).length;

  // STATS

  const stats = [

    {
      title: "Total Students",
      value: students.length,
      icon: "👨‍🎓",
      color: "#2563eb"
    },

    {
      title: "Total Teachers",
      value: teachers.length,
      icon: "👩‍🏫",
      color: "#10b981"
    },

    {
      title: "Attendance %",
      value:
        `${attendancePercentage}%`,
      icon: "📈",
      color: "#f59e0b"
    },

    {
      title: "Classes",
      value: classes.length,
      icon: "🏫",
      color: "#ef4444"
    }

  ];

  // MOCK CHART DATA (Ideally computed from attendance data)
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

      <Sidebar role="admin" />

      {/* MAIN */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Admin Dashboard" />

        {/* TITLE */}

        <h1 className="page-title">
          Welcome Admin 👋
        </h1>

        {/* STATS */}

        <div className="grid grid-4">

          {stats.map((item, index) => (

            <div
              key={index}
              className="glass-card stat-card"
              style={{
                borderLeft:
                  `4px solid ${item.color}`
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center"
                }}
              >

                <div>

                  <h3>{item.title}</h3>

                  <p>{item.value}</p>

                </div>

                <span
                  style={{
                    fontSize: "30px"
                  }}
                >
                  {item.icon}
                </span>

              </div>

            </div>

          ))}

        </div>

        {/* GRID */}

        <div
          className="grid grid-2"
          style={{
            marginTop: "24px"
          }}
        >

          {/* ANALYTICS */}

          <div
            className="glass-card"
            style={{
              padding: "24px"
            }}
          >

            <h2
              style={{
                marginBottom: "20px"
              }}
            >
              📊 Attendance Trends
            </h2>

            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#0f172a" />
                  <YAxis stroke="#0f172a" />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.2)'}} contentStyle={{ borderRadius: '10px', border: 'none', background: 'rgba(255,255,255,0.8)' }} />
                  <Bar dataKey="attendance" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* ADMIN ACTIONS */}

          <div
            className="glass-card"
            style={{
              padding: "24px"
            }}
          >

            <h2
              style={{
                marginBottom: "20px"
              }}
            >
              ⚡ Admin Actions
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2,1fr)",
                gap: "14px"
              }}
            >

              <button
                className="primary-btn"
                onClick={() =>
                  navigate("/add-teacher")
                }
              >
                Add Teacher
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate("/add-student")
                }
              >
                Add Student
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate("/add-class")
                }
              >
                Create Class
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate(
                    "/manage-teachers"
                  )
                }
              >
                Manage Teachers
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  navigate(
                    "/manage-students"
                  )
                }
              >
                Manage Students
              </button>

              <button
                className="primary-btn"
              >
                Notifications
              </button>

            </div>

          </div>

        </div>

        {/* REPORTS */}

        <div
          className="grid grid-3"
          style={{
            marginTop: "24px"
          }}
        >

          <div className="glass-card stat-card">

            <span
              style={{
                fontSize: "28px"
              }}
            >
              📄
            </span>

            <h3>
              Attendance Reports
            </h3>

            <p>
              View Daily & Monthly
            </p>

          </div>

          <div className="glass-card stat-card">

            <span
              style={{
                fontSize: "28px"
              }}
            >
              📊
            </span>

            <h3>
              Performance Reports
            </h3>

            <p>
              Student Performance
            </p>

          </div>

          <div className="glass-card stat-card">

            <span
              style={{
                fontSize: "28px"
              }}
            >
              🔔
            </span>

            <h3>
              Notifications
            </h3>

            <p>
              {notifications.length}
              {" "}New Updates
            </p>

          </div>

        </div>

        {/* RECENT ACTIVITIES */}

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

            <div className="activity-card">
              ✅ Attendance updated
            </div>

            <div className="activity-card">
              👩‍🏫 Teachers assigned
            </div>

            <div className="activity-card">
              📝 Results published
            </div>

            <div className="activity-card">
              👨‍👩‍👧 Parent approvals pending:
              {" "}
              {parents.length}
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;