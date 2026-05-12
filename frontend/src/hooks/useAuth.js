import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user, role) => set({ user, role, loading: false }),
  setLoading: (loading) => set({ loading }),
}));

export const initializeAuthListener = () => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          useAuthStore.getState().setUser(user, userDoc.data().role);
        } else {
          console.warn("User document not found in Firestore.");
          useAuthStore.getState().setUser(user, null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        useAuthStore.getState().setUser(user, null);
      }
    } else {
      useAuthStore.getState().setUser(null, null);
    }
  });
  return unsubscribe;
};
