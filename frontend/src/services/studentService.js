import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// COLLECTION

const studentCollection =
  collection(db, "students");

// ADD STUDENT

export const addStudent =
  async (studentData) => {

    try {

      await addDoc(
        studentCollection,
        studentData
      );

      return {
        success: true
      };

    } catch (error) {

      console.log(error);

      return {
        success: false,
        message: error.message
      };

    }

};

// GET STUDENTS

export const getStudents =
  async () => {

    try {

      const snapshot =
        await getDocs(
          studentCollection
        );

      const students =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

      return {
        success: true,
        data: students
      };

    } catch (error) {

      console.log(error);

      return {
        success: false,
        message: error.message
      };

    }

};

// DELETE STUDENT

export const deleteStudent =
  async (id) => {

    try {

      await deleteDoc(
        doc(
          db,
          "students",
          id
        )
      );

      return {
        success: true
      };

    } catch (error) {

      console.log(error);

      return {
        success: false,
        message: error.message
      };

    }

};