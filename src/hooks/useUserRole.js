import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../firebase-config";

export default function useUserRole(role) {
  const [authState, setAuthState] = useState('pending');

  useEffect(
    () => onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthState("error");
        return;
      }

      const q = query(
        collection(db, "users"),
        where("email", "==", user?.email),
      );
      getDocs(q).then((record) => {
        const data = record.docs[0].data();
        if (data.role === role) {
          setAuthState("success");
        } else {
          setAuthState("error");
        }
      });
    }),
    [],
  );

  return authState;
}
