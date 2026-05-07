import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../firebase/firebase";

// LOGIN USER

export const loginUser = async (
  email,
  password
) => {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return {
      success: true,
      user: userCredential.user
    };

  } catch (error) {

    return {
      success: false,
      message: error.message
    };

  }
};

// LOGOUT USER

export const logoutUser = async () => {

  try {

    await signOut(auth);

    localStorage.clear();

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