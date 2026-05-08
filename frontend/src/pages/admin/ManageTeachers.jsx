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

function ManageTeachers() {

  // STATES

  const [teachers, setTeachers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // FETCH TEACHERS

  useEffect(() => {

    fetchTeachers();

  }, []);

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

  // DELETE TEACHER

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Teacher?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "teachers",
            id
          )
        );

        fetchTeachers();

      } catch (error) {

        console.log(error);

      }

    };

  // FILTER

  const filteredTeachers =
    teachers.filter((teacher) =>

      teacher.name
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

        <Navbar title="Manage Teachers" />

        {/* TITLE */}

        <h1 className="page-title">
          Manage Teachers
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
            placeholder="Search Teacher..."
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

                  <th>Email</th>

                  <th>Subject</th>

                  <th>Assigned Class</th>

                  <th>Phone</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredTeachers.map(
                  (teacher) => (

                    <tr
                      key={teacher.id}
                    >

                      <td>
                        {teacher.name}
                      </td>

                      <td>
                        {teacher.email}
                      </td>

                      <td>
                        {teacher.subject}
                      </td>

                      <td>
                        {
                          teacher.assignedClass
                        }
                      </td>

                      <td>
                        {teacher.phone}
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
                                teacher.id
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

export default ManageTeachers;