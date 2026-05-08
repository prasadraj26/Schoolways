import {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db }
from "../../firebase/firebase";

import Sidebar
from "../../components/Sidebar";

import Navbar
from "../../components/Navbar";

function ManageStudents() {

  // STATES

  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // FETCH STUDENTS

  useEffect(() => {

    fetchStudents();

  }, []);

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

  // DELETE STUDENT

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Student?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "students",
            id
          )
        );

        fetchStudents();

      } catch (error) {

        console.log(error);

      }

    };

  // FILTER

  const filteredStudents =
    students.filter((student) =>

      student.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="admin" />

      {/* MAIN */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Manage Students" />

        {/* TITLE */}

        <h1 className="page-title">
          Manage Students
        </h1>

        {/* SEARCH */}

        <div
          className="glass-card"
          style={{
            padding: "20px",
            marginBottom: "24px"
          }}
        >

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* TABLE */}

        <div
          className="glass-card"
          style={{
            padding: "24px"
          }}
        >

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Class</th>

                  <th>Roll</th>

                  <th>Parent</th>

                  <th>Phone</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map(
                  (student) => (

                    <tr
                      key={student.id}
                    >

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {
                          student.className
                        }
                      </td>

                      <td>
                        {student.roll}
                      </td>

                      <td>
                        {
                          student.parentName
                        }
                      </td>

                      <td>
                        {student.phone}
                      </td>

                      <td>

                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >

                          <button
                            className="primary-btn"
                          >
                            Edit
                          </button>

                          <button
                            className="primary-btn"
                            onClick={() =>
                              handleDelete(
                                student.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

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

export default ManageStudents;