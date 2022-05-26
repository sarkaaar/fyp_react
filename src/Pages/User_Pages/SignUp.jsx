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
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Header from "./Components/Header";

export default function SignUp() {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  const loginGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);

  const usersCollection = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      navigate("/");
    }
  }, [user]);

  const signUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
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

  // const logout = async () => {
  //   await signOut(auth);
  // };

  return (
    <>
      {/* <Header /> */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10">
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
                error={nameError}
                helperText="Only characters allowed"
                onChange={(e) => {
                  setName(e.target.value);
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
      {/* <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>

      </div> */}
      {/* <Button onClick={logout}>Logout</Button> */}
    </>
  );
}
