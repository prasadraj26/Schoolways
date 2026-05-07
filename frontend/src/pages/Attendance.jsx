import {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getStudents
} from "../services/studentService";

import {
  saveAttendance,
  getAttendanceByDate
} from "../services/attendanceService";

function Attendance() {

  const [students, setStudents] =
    useState([]);

  const [attendanceDate,
    setAttendanceDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  // FETCH STUDENTS

  const fetchStudents =
    async () => {

      const response =
        await getStudents();

      if (response.success) {

        const updated =
          response.data.map(
            (student) => ({
              ...student,
              status: "Present"
            })
          );

        setStudents(updated);

      }

    };

  useEffect(() => {
    fetchStudents();
  }, []);

  // TOGGLE STATUS

  const toggleAttendance =
    (id) => {

      const updatedStudents =
        students.map((student) => {

          if (student.id === id) {

            return {
              ...student,
              status:
                student.status ===
                "Present"
                  ? "Absent"
                  : "Present"
            };

          }

          return student;

        });

      setStudents(updatedStudents);

    };

  // SAVE ATTENDANCE

  const handleSaveAttendance =
    async () => {

      for (const student of students) {

        await saveAttendance({
          studentId: student.id,
          studentName:
            student.name,
          className:
            student.className,
          roll:
            student.roll,
          status:
            student.status,
          date:
            attendanceDate
        });

      }

      alert(
        "Attendance Saved Successfully ✅"
      );

    };

  // VIEW SAVED RECORDS

  const handleViewAttendance =
    async () => {

      const response =
        await getAttendanceByDate(
          attendanceDate
        );

      if (response.success &&
          response.data.length > 0) {

        setStudents(response.data);

      } else {

        alert(
          "No attendance records found"
        );

      }

    };

  return (
    <div className="app-container">

      {/* Sidebar */}

      <Sidebar role="teacher" />

      {/* Main */}

      <div className="main-content">

        {/* Navbar */}

        <Navbar title="Attendance Management" />

        {/* Title */}

        <h1 className="page-title">
          Attendance System
        </h1>

        {/* Controls */}

        <div
          className="glass-card"
          style={{
            padding: "24px",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >

            {/* Date */}

            <input
              type="date"
              value={attendanceDate}
              onChange={(e) =>
                setAttendanceDate(
                  e.target.value
                )
              }
              style={{
                maxWidth: "220px"
              }}
            />

            {/* Save */}

            <button
              className="primary-btn"
              onClick={
                handleSaveAttendance
              }
            >
              Save Attendance
            </button>

            {/* View */}

            <button
              className="primary-btn"
              onClick={
                handleViewAttendance
              }
            >
              View Records
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-3">

          <div className="glass-card stat-card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>

          <div className="glass-card stat-card">
            <h3>Present</h3>
            <p>
              {
                students.filter(
                  (s) =>
                    s.status ===
                    "Present"
                ).length
              }
            </p>
          </div>

          <div className="glass-card stat-card">
            <h3>Absent</h3>
            <p>
              {
                students.filter(
                  (s) =>
                    s.status ===
                    "Absent"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Table */}

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
            Mark Attendance
          </h2>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Roll No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {students.map(
                  (student) => (

                    <tr
                      key={student.id}
                    >

                      <td>
                        {student.name ||
                         student.studentName}
                      </td>

                      <td>
                        {student.className}
                      </td>

                      <td>
                        {student.roll}
                      </td>

                      <td>

                        <span
                          style={{
                            padding:
                              "8px 14px",
                            borderRadius:
                              "12px",
                            background:
                              student.status ===
                              "Present"
                                ? "rgba(34,197,94,0.2)"
                                : "rgba(239,68,68,0.2)",
                            color:
                              student.status ===
                              "Present"
                                ? "#22c55e"
                                : "#ef4444",
                            fontWeight:
                              "600"
                          }}
                        >
                          {student.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="primary-btn"
                          onClick={() =>
                            toggleAttendance(
                              student.id
                            )
                          }
                        >
                          Toggle
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Attendance;