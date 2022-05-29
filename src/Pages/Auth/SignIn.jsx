import GoogleIcon from "@mui/icons-material/Google";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function SignIn() {
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      navigate("/");
    }
  }, [user]);

  // Login Function
  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        sendEmailVerification(res.user);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.code);
      });
  };

  // login with google function

  const auth = getAuth();
  const loginGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const usersCollection = collection(db, "users");

        const user = result.user;
        const _user = {
          email: result.user.email,
          role: "user",
          name: result.user.displayName,
        };
        console.log(_user);
        await addDoc(usersCollection, _user)
          .then((res) => {
            console.log(res);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });

        // ...
      })
      .catch((error) => {
        console.log(error);
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10">
        <div className="">
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
          <div className="-space-y-px rounded-md shadow-sm">
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
            {errorMessage !== "" ? (
              <h1 className="font-bold text-red-600 ">{errorMessage}</h1>
            ) : (
              <div />
            )}
          </div>

          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              login();
            }}
          >
            Sign in
          </button>

          <div className="flex space-x-2">
            <p>New to Pet-Planet </p>
            <Link
              to="/sign_up"
              className="font-medium  text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex space-x-2 justify-end">
            <Link
              to="/forget-password"
              className="font-medium  text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password ?
            </Link>
          </div>
          <hr />
        </form>
        <div className="">
          <h2 className="m-auto w-6">Or</h2>
          <button
            type="button"
            onClick={loginGoogle}
            className="mt-4 w-full rounded-md bg-red-600 py-2 px-4 text-white hover:bg-red-700 focus:ring-red-500"
          >
            Sign in with <GoogleIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
