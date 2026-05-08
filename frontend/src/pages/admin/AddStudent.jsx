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

function AddStudent() {

  // FORM STATE

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

      // VALIDATION

      if (
        !formData.name ||
        !formData.className ||
        !formData.roll
      ) {

        alert(
          "Please fill required fields"
        );

        return;

      }

      try {

        // SAVE TO FIREBASE

        await addDoc(
          collection(
            db,
            "students"
          ),
          {
            ...formData,
            createdAt:
              new Date()
          }
        );

        alert(
          "Student Added ✅"
        );

        // RESET FORM

        setFormData({
          name: "",
          className: "",
          roll: "",
          parentName: "",
          phone: "",
          gender: "",
          address: ""
        });

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add student ❌"
        );

      }

    };

  return (

    <div className="app-container">

      {/* SIDEBAR */}

      <Sidebar role="admin" />

      {/* MAIN CONTENT */}

      <div className="main-content">

        {/* NAVBAR */}

        <Navbar title="Add Student" />

        {/* TITLE */}

        <h1 className="page-title">
          Add Student
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
                placeholder="Enter student name"
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
                placeholder="Example: 10-A"
                value={formData.className}
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
                placeholder="Roll Number"
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
                placeholder="Parent Name"
                value={formData.parentName}
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
                placeholder="Phone Number"
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
                placeholder="Student Address"
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
                width: "100%",
                marginTop: "10px"
              }}
            >
              Add Student
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddStudent;