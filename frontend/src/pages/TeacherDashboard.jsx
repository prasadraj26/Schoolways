import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { useAuthStore } from "../hooks/useAuth";
import { useCollectionRealtime } from "../hooks/useRealtime";

function TeacherDashboard() {

  const { user } = useAuthStore();

  // =========================
  // CLASSES
  // =========================

  const { data: classes } =
    useCollectionRealtime(
      "classes",
      user?.uid
        ? [['teacherId', '==', user.uid]]
        : []
    );

  const classIds =
    classes.map((c) => c.id);

  // =========================
  // STUDENTS
  // =========================

  const { data: students } =
    useCollectionRealtime(
      "students",
      classIds.length > 0
        ? [['classId', 'in', classIds.slice(0, 10)]]
        : []
    );

  // =========================
  // ATTENDANCE
  // =========================

  const { data: attendance } =
    useCollectionRealtime(
      "attendance",
      user?.uid
        ? [['teacherId', '==', user.uid]]
        : []
    );

  // =========================
  // ASSIGNMENTS
  // =========================

  const { data: assignments } =
    useCollectionRealtime(
      "assignments",
      user?.uid
        ? [['teacherId', '==', user.uid]]
        : []
    );

  // =========================
  // ACTIVITIES
  // =========================

  const { data: activities } =
    useCollectionRealtime(
      "activities"
    );

  // =========================
  // ATTENDANCE %
  // =========================

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

  // =========================
  // DASHBOARD STATS
  // =========================

  const stats = [

    {
      title: "Classes Assigned",
      value: classes.length
    },

    {
      title: "Students",
      value: students.length
    },

    {
      title: "Attendance %",
      value: `${attendancePercentage}%`
    },

    {
      title: "Assignments Uploaded",
      value: assignments.length
    }

  ];

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="teacher" />

      {/* MAIN */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Teacher Dashboard" />

        {/* TITLE */}

        <h1 className="page-title">
          Welcome Teacher 👩‍🏫
        </h1>

        {/* STATS */}

        <div className="grid grid-4">

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

        {/* TODAY'S SCHEDULE */}

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

            {classes.length === 0 ? (

              <div
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  background:
                    "rgba(255,255,255,0.05)"
                }}
              >
                No classes assigned yet.
              </div>

            ) : (

              classes.map((cls) => (

                <div
                  key={cls.id}
                  style={{
                    padding: "18px",
                    borderRadius: "16px",
                    background:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  📘 {cls.name || "Unnamed Class"}

                </div>

              ))

            )}

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

            {activities.length === 0 ? (

              <div
                style={{
                  padding: "18px",
                  borderRadius: "16px",
                  background:
                    "rgba(255,255,255,0.05)"
                }}
              >
                No recent activities.
              </div>

            ) : (

              activities
                .slice(0, 5)
                .map((activity) => (

                  <div
                    key={activity.id}
                    style={{
                      padding: "18px",
                      borderRadius: "16px",
                      background:
                        "rgba(255,255,255,0.05)"
                    }}
                  >

                    {activity.message}

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