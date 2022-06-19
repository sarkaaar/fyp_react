import { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { TextField, Button } from "@mui/material";

export default function PasswordUpdate() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState("");

  const confPassword = async () => {
    if (password === confirmPassword)
      if (password.length >= 8) {
        updatePassword(user, password)
          .then((res) => {
            console.log(res);
            alert("Password update sucessfully");
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
    <div className="absolute top-1/2 left-1/2 w-96 -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
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
          <></>
        ) : (
          <p className="font-italic text-red-600">Password does not match</p>
        )}
        <Button variant="outlined" fullWidth onClick={confPassword}>
          Update Password
        </Button>
      </div>
    </div>
  );
}
