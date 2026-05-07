import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// COLLECTION

const marksCollection =
  collection(db, "marks");

// ADD MARKS

export const addMarks = async (
  marksData
) => {

  try {

    const response = await addDoc(
      marksCollection,
      marksData
    );

    return {
      success: true,
      id: response.id
    };

  } catch (error) {

    return {
      success: false,
      message: error.message
    };

  }

};

// GET MARKS

export const getMarks = async () => {

  try {

    const snapshot =
      await getDocs(marksCollection);

    const marks =
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

    return {
      success: true,
      data: marks
    };

  } catch (error) {

    return {
      success: false,
      message: error.message
    };

  }

};

// DELETE MARKS

export const deleteMarks = async (id) => {

  try {

    await deleteDoc(
      doc(db, "marks", id)
    );

    return {
      success: true
    };

  } catch (error) {

    return {
      success: false,
      message: error.message
    };

  }

};