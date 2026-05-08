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

function AddTeacher() {

  // FORM STATE

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "",
      assignedClass: "",
      phone: ""
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
            "teachers"
          ),
          formData
        );

        alert(
          "Teacher Added ✅"
        );

        // RESET

        setFormData({
          name: "",
          email: "",
          subject: "",
          assignedClass: "",
          phone: ""
        });

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="admin" />

      {/* MAIN */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Add Teacher" />

        {/* TITLE */}

        <h1 className="page-title">
          Add Teacher
        </h1>

        {/* FORM */}

        <div
          className="glass-card form-container"
        >

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <input
                type="text"
                name="name"
                placeholder="Teacher Name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <input
                type="email"
                name="email"
                placeholder="Teacher Email"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* SUBJECT */}

            <div className="form-group">

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />

            </div>

            {/* CLASS */}

            <div className="form-group">

              <input
                type="text"
                name="assignedClass"
                placeholder="Assigned Class"
                value={formData.assignedClass}
                onChange={handleChange}
              />

            </div>

            {/* PHONE */}

            <div className="form-group">

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
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
              Add Teacher
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddTeacher;