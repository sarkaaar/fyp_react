import * as React from "react";
import Header from "./Components/Header";
import GoogleIcon from "@mui/icons-material/Google";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      console.log("error creating user");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <>
      <Header />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an Account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <TextField
                style={{ paddingBottom: "15px" }}
                fullWidth
                // required
                label="Name"
                type={"text"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                style={{ paddingBottom: "15px" }}
                fullWidth
                // required
                label="Email Address"
                type={"email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                style={{ paddingBottom: "15px" }}
                fullWidth
                // required
                type={"password"}
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <TextField
                style={{ paddingBottom: "15px" }}
                fullWidth
                // required
                label="Confirm Password"
                type={"password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <div className="m-2">
                {confirmPassword === password ? (
                  <h1> </h1>
                ) : (
                  <h1 className="text-red-700 font-semibold">
                    Password doesn't Match
                  </h1>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="Policy"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to all terms and conditions of the policy.
                </label>
              </div>
            </div>
            <div>
              <button
                // type="submit"
                onClick={signUp}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
            <div className="flex">
              <p>Already Have an Account </p>
              <a
                href="/sign_in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </a>
            </div>
            <hr />
            <div className="">
              <h2 className="w-6 m-auto">Or</h2>
              <button className="mt-4 py-2 px-4 w-full text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 rounded-md">
                Sign Up with <GoogleIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>

        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  );
}
