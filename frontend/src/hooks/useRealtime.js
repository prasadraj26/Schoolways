import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const useCollectionRealtime = (collectionName, filters = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let q = collection(db, collectionName);
    
    // Apply filters if any (e.g., [['classId', '==', '123']])
    if (filters.length > 0) {
      const queryConstraints = filters.map(f => where(f[0], f[1], f[2]));
      q = query(q, ...queryConstraints);
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(results);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(filters)]);

  return { data, loading, error };
};

export const useSubcollectionRealtime = (parentCollection, parentId, subcollectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!parentId) {
      setLoading(false);
      return;
    }

    const q = collection(db, parentCollection, parentId, subcollectionName);
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(results);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${subcollectionName}:`, err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [parentCollection, parentId, subcollectionName]);

  return { data, loading, error };
};
