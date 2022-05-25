import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { db } from "../../../firebase-config";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import UserLayout from "../../../layouts/UserLayout";
import { onAuthStateChanged } from "firebase/auth";
import {  auth } from "../../../firebase-config";


export default function ComplainSuggestions() {
  const [description, setDescription] = useState("");
  const [subj, setSubj] = useState("");
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);
  const [complain, setComplain] = useState([]);
  const complainRef = collection(db, "complain");

  const addComplain = async () => {
    const newObj = {
      subject: subj,
      user: user?.email,
      description,
    };
    setLoader(true);
    await addDoc(complainRef, newObj)
      .then(() => {
        console.log("Add To Complain Sucessfully");
        // getComplain();
        // setAddStatus(false);
        setLoader(false);
      })

      .catch((err) => {
        console.log(err);
        // setAddStatus(false);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  // const getComplain = async () => {
  //   const q = query(
  //     favouritesRef,
  //     where("user", "==", user?.email),
  //     where("subject", "==", subj)
  //   );

  //   await getDocs(q)
  //     .then((res) => {
  //       setComplain(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  return (
    <UserLayout>
      <div className="flex " />
      <div className="  mt-6">
        <div className="align-center  m-auto ">
          <h1 className="text-center text-3xl">Complaints and Suggestions</h1>
          <div className="w-full">
            <TextField
              margin="normal"
              required
              fullWidth
              label="Subject"
              autoComplete="off"
              value={subj}
              onChange={(e) => setSubj(e.target.value)}
            />

            <TextareaAutosize
              minRows={5}
              placeholder="  Description*"
              className="mt-8 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-6 mb-12"
              onClick={addComplain}

              // className="mt-6 mb-12"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
