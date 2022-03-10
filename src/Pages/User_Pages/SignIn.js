import Header from "./Components/Header";
import GoogleIcon from "@mui/icons-material/Google";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    // localStorage.setItem("token", user.accessToken);
  });

  // Login Function
  const login = async () => {
    try {
      const LoggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Signed in Sucessfully");

      // console.log(LoggedInUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    // console.log("Current user signed in");
  };

  // Logout Function
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Header />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
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
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="email"
              />

              <TextField
                label="Password"
                fullWidth
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
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
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/sign_in"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                // type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  login();
                }}
              >
                Sign in
              </button>
            </div>
            <div className="flex">
              <p>New to Pet-Planet </p>
              <Link
                to="/sign_up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </div>
            <hr />
          </form>
          <div className="">
            <h2 className="w-6 m-auto">Or</h2>
            <button className="mt-4 py-2 px-4 w-full text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 rounded-md">
              Sign in with <GoogleIcon />
            </button>
          </div>
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
