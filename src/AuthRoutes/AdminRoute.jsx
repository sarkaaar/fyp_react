import React, { useEffect, useState } from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export default function AdminRoute() {
  const [user, setUser] = useState({});
  const [db_user, setdb_User] = useState({});

  const userRef = collection(db, 'users');

  const getUser = async () => {
    const q = await query(userRef, where('user', '==', user?.email));
    const queryResults = await getDocs(q);
    setdb_User(queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });
    getUser();
  }, [user]);

  return auth ? <Outlet /> : <Navigate to="/login" />;
}
