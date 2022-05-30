import { useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import * as React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

export default function NewDoctor() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const usersRef = collection(db, "users");
  const doctorsRef = collection(db, "doctors");

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [noUserOpen, setNoUserOpen] = useState(false);

  const createDoctor = async () => {
    //   1- Fetch for the record in Doctor's Table
    const q = query(doctorsRef, where("email", "==", email));
    await getDocs(q)
      .then(async (res) => {
        const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        // 2- if the user is found in table then with go for authentication
        if (data.length != 0)
          await createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
              console.log(res.user.uid);
            })
            .catch((err) => {
              if (err.code === "auth/email-already-in-use") {
                setOpen(true);
              }
            });
        else {
          setNoUserOpen(true);
          console.log("doctor was not found");
        }
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err.code);
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
      <Modal
        sx={{ mb: 70, ml: "auto", mr: "auto" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="border-box absolute inset-1/2 h-fit w-96 bg-white p-4 drop-shadow-2xl">
          <h1 className="text-2xl font-bold">Email Alreaddy Exists</h1>
          <h1 className="text-xl">
            The Email Address You Entered Already Exists As a User Profile .
          </h1>
          <h1 className="text-xl">
            You can Still Sign In With Your Email and Password to the Doctor
            Profile
          </h1>
          <Button
            onClick={() => {
              navigate("/sign_in");
            }}
          >
            Sign In
          </Button>
        </div>
      </Modal>

      <Modal
        sx={{ mb: 70, ml: "auto", mr: "auto" }}
        open={noUserOpen}
        onClose={() => setNoUserOpen(false)}
      >
        <div className="border-box absolute inset-1/2 h-fit w-96 bg-white p-4 drop-shadow-2xl">
          <h1 className="text-2xl font-bold">Email Alreaddy Exists</h1>
          <h1 className="text-xl">
            The Email Address You Entered Already Exists As a User Profile .
          </h1>
          <h1 className="text-xl">
            You can Still Sign In With Your Email and Password to the Doctor
            Profile
          </h1>
          <Button
            onClick={() => {
              navigate("/sign_in");
            }}
          >
            Sign In
          </Button>
        </div>
      </Modal>
    </div>
  );
}
