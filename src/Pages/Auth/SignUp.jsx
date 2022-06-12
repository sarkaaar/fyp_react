import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { ArrowSmLeftIcon } from "@heroicons/react/outline";

// import Header from "./Components/Header";

export default function SignUp() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();

  const usersCollection = collection(db, "users");

  // Auth
  const auth_ = getAuth();
  const provider = new GoogleAuthProvider();

  // login with google

  const loginGoogle = async () => {
    await signInWithPopup(auth_, provider)
      .then((result) => {
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  sign up with email and password

  const signUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          sendEmailVerification(res.user);
          console.log(res.user.uid);
          const _user = {
            email,
            phone,
            password,
            role: "user",
            name,
            uid: res.user.uid,
          };
          await addDoc(usersCollection, _user)
            .then((res) => {
              console.log(res);
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code);
          console.log(error.code);
          console.log("error creating user");
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) navigate("/");
    });
  }, [user]);

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10">
        <button onClick={() => {navigate("/")}} className="group relative flex justify-start rounded-md border bg-indigo-100 border-transparent py-2 px-4 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <ArrowSmLeftIcon className="h-5 w-5" /> Home Page
        </button>
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
            <div className="-space-y-px rounded-md shadow-sm">
              <TextField
                style={{ paddingBottom: "15px" }}
                fullWidth
                required
                label="Name"
                type="text"
                value={name}
                // error={nameError}
                helperText="Only characters allowed"
                onChange={(e) => {
                  setName(e.target.value.replace(/\d+/g, ''));
                }}
              />
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
                label="Phone Number"
                type="text"
                value={phone}
                helperText="Type 11 digit numbers Only "
                inputProps={{ pattern: "\\d{11}", title: "Please enter correct phone number" }}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              {errorMessage !== "" ? (
                <h1 className="mb-2 font-bold text-red-600">{errorMessage}</h1>
              ) : (
                <></>
              )}
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
                style={{ paddingBottom: "15px" }}
                fullWidth
                required
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <div className="m-2">
                {confirmPassword === password ? (
                  <h1> </h1>
                ) : (
                  <h1 className="font-semibold text-red-700">
                    Password doesn't Match
                  </h1>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={signUp}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
            <div className="flex space-x-2">
              <p>Already Have an Account </p>
              <a
                href="/sign_in"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </a>
            </div>
            <hr />
          </form>
          <div className="">
            <h2 className="m-auto w-6">Or</h2>
            <button
              onClick={loginGoogle}
              className="mt-4 w-full rounded-md bg-red-600 py-2 px-4 text-white hover:bg-red-700 focus:ring-red-500"
            >
              Sign Up with <GoogleIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
