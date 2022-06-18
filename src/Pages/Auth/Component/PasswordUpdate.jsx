import { useState, useEffect } from "react";
import { auth } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { TextField ,Button } from "@mui/material";

export default function PasswordUpdate() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [user, setUser] = useState();

  const confPassword = async () => {
    if (password === confirmPassword)
      updatePassword(user, password)
        .then((res) => {
          console.log(res);
          alert("Password update sucessfully");
        })
        .catch((error) => {
          console.log(error);
        });
    else alert("Passwords do not match");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  return (
    <div className="border-box absolute inset-1/2 h-fit w-96 rounded-xl bg-white p-4 drop-shadow-2xl">
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
