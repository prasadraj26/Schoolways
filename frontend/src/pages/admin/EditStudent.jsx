import {
  useEffect,
  useState
} from "react";

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { db }
from "../../firebase/firebase";

import Sidebar
from "../../components/Sidebar";

import Navbar
from "../../components/Navbar";

function EditStudent() {

  // ROUTER

  const { id } = useParams();

  const navigate =
    useNavigate();

  // STATE

  const [formData, setFormData] =
    useState({
      name: "",
      className: "",
      roll: "",
      parentName: "",
      phone: "",
      gender: "",
      address: ""
    });

  // FETCH STUDENT

  useEffect(() => {

    fetchStudent();

  }, []);

  const fetchStudent =
    async () => {

      try {

        const docRef =
          doc(
            db,
            "students",
            id
          );

        const snapshot =
          await getDoc(docRef);

        if (snapshot.exists()) {

          setFormData(
            snapshot.data()
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // HANDLE INPUT

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  // UPDATE

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const docRef =
          doc(
            db,
            "students",
            id
          );

        await updateDoc(
          docRef,
          formData
        );

        alert(
          "Student Updated ✅"
        );

        navigate(
          "/manage-students"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Update Failed ❌"
        );

      }

    };

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="admin" />

      {/* MAIN */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Edit Student" />

        {/* TITLE */}

        <h1 className="page-title">
          Edit Student
        </h1>

        {/* FORM */}

        <div
          className="glass-card form-container"
          style={{
            maxWidth: "700px"
          }}
        >

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            {/* CLASS */}

            <div className="form-group">

              <label>
                Class
              </label>

              <input
                type="text"
                name="className"
                value={
                  formData.className
                }
                onChange={handleChange}
              />

            </div>

            {/* ROLL */}

            <div className="form-group">

              <label>
                Roll Number
              </label>

              <input
                type="text"
                name="roll"
                value={formData.roll}
                onChange={handleChange}
              />

            </div>

            {/* PARENT */}

            <div className="form-group">

              <label>
                Parent Name
              </label>

              <input
                type="text"
                name="parentName"
                value={
                  formData.parentName
                }
                onChange={handleChange}
              />

            </div>

            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            {/* GENDER */}

            <div className="form-group">

              <label>
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>

            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="primary-btn"
              style={{
                width: "100%"
              }}
            >
              Update Student
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditStudent;