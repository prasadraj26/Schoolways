import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// COLLECTION

const attendanceCollection =
  collection(db, "attendance");

// SAVE ATTENDANCE

export const saveAttendance =
  async (attendanceData) => {

    try {

      await addDoc(
        attendanceCollection,
        attendanceData
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

// GET ATTENDANCE BY DATE

export const getAttendanceByDate =
  async (date) => {

    try {

      const q = query(
        attendanceCollection,
        where("date", "==", date)
      );

      const snapshot =
        await getDocs(q);

      const records =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

      return {
        success: true,
        data: records
      };

    } catch (error) {

      return {
        success: false,
        message: error.message
      };

    }

};