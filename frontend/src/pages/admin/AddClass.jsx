import { useState } from "react";

import {
  collection,
  addDoc
} from "firebase/firestore";

import { db }
from "../../firebase/firebase";

import Sidebar
from "../../components/Sidebar";

import Navbar
from "../../components/Navbar";

function AddClass() {

  // FORM STATE

  const [formData, setFormData] =
    useState({
      className: "",
      section: "",
      classTeacher: "",
      roomNumber: ""
    });

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // SUBMIT

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await addDoc(
          collection(
            db,
            "classes"
          ),
          formData
        );

        alert(
          "Class Created ✅"
        );

        // RESET FORM

        setFormData({
          className: "",
          section: "",
          classTeacher: "",
          roomNumber: ""
        });

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="admin" />

      {/* MAIN CONTENT */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Create Class" />

        {/* TITLE */}

        <h1 className="page-title">
          Create Class
        </h1>

        {/* FORM */}

        <div
          className="glass-card form-container"
        >

          <form onSubmit={handleSubmit}>

            {/* CLASS */}

            <div className="form-group">

              <input
                type="text"
                name="className"
                placeholder="Class Name (Example: 10)"
                value={formData.className}
                onChange={handleChange}
              />

            </div>

            {/* SECTION */}

            <div className="form-group">

              <input
                type="text"
                name="section"
                placeholder="Section (Example: A)"
                value={formData.section}
                onChange={handleChange}
              />

            </div>

            {/* CLASS TEACHER */}

            <div className="form-group">

              <input
                type="text"
                name="classTeacher"
                placeholder="Class Teacher"
                value={formData.classTeacher}
                onChange={handleChange}
              />

            </div>

            {/* ROOM */}

            <div className="form-group">

              <input
                type="text"
                name="roomNumber"
                placeholder="Room Number"
                value={formData.roomNumber}
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
              Create Class
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddClass;