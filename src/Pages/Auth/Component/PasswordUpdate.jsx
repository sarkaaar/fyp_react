import { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export default function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const confPassword = async () => {
    if (password === confirmPassword)
      if (password.length >= 8) {
        updatePassword(user, password)
          .then((res) => {
            console.log(res);
            // alert("Password update sucessfully");
            setOpen(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else setError("Password must be atleast 8 characters");
    else alert("Passwords do not match");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  return (
    <div className="absolute top-1/2 left-1/2 w-96 -translate-y-1/2 -translate-x-1/2 rounded-lg  p-4 shadow-lg">
      <h1 className="p-4 text-center text-xl font-bold">Update Password</h1>
      <div className="flex flex-col gap-4">
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label="Password"
        />
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          label="Confirm Password"
        />
        <p className="font-italic text-red-600">{error}</p>
        {password === confirmPassword ? (
          <div />
        ) : (
          <p className="font-italic text-red-600">Password does not match</p>
        )}
        <button
          class="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          onClick={confPassword}
          onClose={() => setOpen(false)}
        >
          Update Password
        </button>
      </div>

      <Modal open={open} onClose={() => {
        
        setOpen(false);
        window.location.reload(false);
      }}>
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
           Password Change Successfully
          </h1>
          
        </div>
      </Modal>
    </div>
  );
}
