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
import { ArrowSmLeftIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      navigate("/");
    }
  }, [user]);

  // Login Function
  const login = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
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
        <button
          onClick={() => {
            navigate("/");
          }}
          className="group relative flex justify-start rounded-md border border-transparent bg-indigo-100 py-2 px-4 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ArrowSmLeftIcon className="h-5 w-5" /> Home Page
        </button>
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            login(data);
          })}
        >
          <div className=" rounded-md shadow-sm">
            <input
              className="mb-2 w-full rounded-md border border-solid border-slate-400"
              type="email"
              placeholder="Email *"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid Email!  Example: abc@gmail.com",
                },
              })}
            />
            {errors.email && (
              <div className="mb-4 text-red-600">{errors.email.message}</div>
            )}
            <div className="relative">
              <input
                className="mb-2 mt-2 w-full rounded-md border border-solid border-slate-400"
                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <EyeIcon
                    className="h-4 w-4 border-none rounded-md cursor-pointer hover:scale-110"
                    onClick={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <EyeOffIcon
                    className="h-4 w-4 border-none rounded-md cursor-pointer hover:scale-110"
                    onClick={() => {
                      setShowPassword(true);
                    }}
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <div className="mb-4 text-red-600">{errors.password.message}</div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex flex-col">
          <p className="mb-2">
            New to Pet-Planet?{" "}
            <Link
              to="/sign_up"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Sign Up
            </Link>{" "}
          </p>
          <p className="mb-2">
            Forgot Password?{" "}
            <Link
              to="/forget-password"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Click Here
            </Link>
          </p>
        </div>
        <div className=""></div>
        <hr />

        {/* <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Sign Up
            </Link>
          </div>
          <div className="flex justify-end space-x-2">
            <Link
              to="/forget-password"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <hr />
        </form> */}
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
