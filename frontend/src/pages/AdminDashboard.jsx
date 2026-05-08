import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";
function AdminDashboard() {

  // NAVIGATION

  const navigate =
    useNavigate();

  // STATES

  const [students, setStudents] =
    useState([]);

  const [teachers, setTeachers] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [classes, setClasses] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [parents, setParents] =
    useState([]);

  // FETCH DATA

  useEffect(() => {

    fetchStudents();
    fetchTeachers();
    fetchAttendance();
    fetchClasses();
    fetchNotifications();
    fetchParents();

  }, []);

  // FETCH STUDENTS

  const fetchStudents =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "students"
            )
          );

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setStudents(data);

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH TEACHERS

  const fetchTeachers =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "teachers"
            )
          );

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setTeachers(data);

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH ATTENDANCE

  const fetchAttendance =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "attendance"
            )
          );

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setAttendance(data);

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH CLASSES

  const fetchClasses =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "classes"
            )
          );

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setClasses(data);

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH NOTIFICATIONS

  const fetchNotifications =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "notifications"
            )
          );

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setNotifications(data);

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH PARENTS

  const fetchParents =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "parents"
            )
          );

        const data =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setParents(data);

      } catch (error) {

        console.log(error);

      }

    };

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
              📊 School Analytics
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >

              <div>
                🏆 Top Performing Class:
                <strong>
                  {" "}10-A
                </strong>
              </div>

              <div>
                ⚠️ Low Attendance Alerts:
                <strong>
                  {" "}
                  {lowAttendance}
                </strong>
              </div>

              <div>
                👩‍🏫 Active Teachers:
                <strong>
                  {" "}
                  {teachers.length}
                </strong>
              </div>

              <div>
                👨‍🎓 Total Students:
                <strong>
                  {" "}
                  {students.length}
                </strong>
              </div>

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