import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewDoctor() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const usersRef = collection(db, "users");
  const doctorsRef = collection(db, "doctors");

  const createDoctor = async () => {
    //   1- Fetch for the record in Doctor's Table
    const q = query(doctorsRef, where("email", "==", email));
    await getDocs(q)
      .then(async (res) => {
        const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // setQueryUser(data[0]);
        // 2- if the user is found in table then with go for authentication
        if (data.length != 0)
          await createUserWithEmailAndPassword(auth, email, password).then(
            async (res) => {
              console.log(res.user.uid);
              const _user = {
                email,
                password,
                role: "doctor",
                uid: res.user.uid,
              };
              //   3- if the use is authenticated with the given email then the record will be made in the users table
              await addDoc(usersRef, _user)
                .then((res) => {
                  console.log(res);
                  navigate("/");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          );
        else console.log("doctor was not found");
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex justify-center mt-36">
        <form className="flex flex-col gap-4 w-96 p-4 bg-white rounded-lg">
          <h1 className="w-full flex justify-center">Continue as a new User</h1>
          <TextField
            style={{ paddingBottom: "15px" }}
            fullWidth
            required
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ paddingBottom: "15px" }}
            fullWidth
            required
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button onClick={createDoctor} variant="outlined">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
