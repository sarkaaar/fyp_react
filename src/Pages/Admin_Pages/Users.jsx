import * as React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import Button from "@material-ui/core/Button";
import AdminLayout from "../../layouts/AdminLayout";

export default function ViewDoctor() {
  const [user, setUser] = useState();
  const [allUser, setAllUser] = useState();

  const usersRef = collection(db, "users");

  const getUsers = async () => {
    if (user) {
      const q = query(usersRef, where("role", "==", "user"));
      await getDocs(q)
        .then((res) => {
          setAllUser(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getUsers();
  }, [user]);

  const disableUsers = async (id) => {
    const prod = doc(db, "users", id);
    await updateDoc(prod, { status: true });
    console.log("User Disabled ");
    getUsers();
  };
  const enableUsers = async (id) => {
    const prod = doc(db, "users", id);
    await updateDoc(prod, { status: false });
    console.log("User Enabled ", id);
    getUsers();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold ml-8">List Of Users</h1>
      <FirebaseDataTable
        query={collection(db, "users")}
        columns={[
          { key: "name", name: "Name" },
          { key: "email", name: "Email" },
          { key: "phone", name: "Phone# " },
          {
            key: "status",
            name: "Status",
            render: (row) => (
              <div className="flex flex-col">
                {!row.status ? (
                  <Button
                    style={{ color: "green" }}
                    onClick={() => {
                      disableUsers(row.id);
                    }}
                  >
                    Enabled
                  </Button>
                ) : (
                  <Button
                    style={{ color: "red" }}
                    onClick={() => {
                      enableUsers(row.id);
                    }}
                  >
                    Disabled
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </AdminLayout>
  );
}
