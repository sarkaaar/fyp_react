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
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { ArrowSmLeftIcon, EyeOffIcon, EyeIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
// import Header from "./Components/Header";

export default function SignUp() {
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  console.log(errors);

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

  const signUp = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (res) => {
        sendEmailVerification(res.user);
        console.log(res.user.uid);
        const _user = {
          email: data.email,
          phone: data.phoneNumber,
          password: data.password,
          role: "user",
          name: data.name,
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
          <button
            onClick={() => {
              navigate("/");
            }}
            className="group relative flex justify-start rounded-md border border-transparent bg-indigo-100 py-2 px-4 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <ArrowSmLeftIcon className="h-5 w-5" /> Home Page
          </button>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an Account
            </h2>
          </div>

          <form
            onSubmit={handleSubmit((data) => {
              signUp(data);
            })}
          >
            <div className="rounded-md shadow-sm space-y-4">
              <input
                className="mb-2 w-full rounded-md border border-solid border-slate-400"
                type="text"
                placeholder="Name *"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z][A-Za-z ]+$/,
                    message: "Only alphabets are accepted.  Example: Your Name",
                  },
                })}
              />
              {errors.name && (
                <div className="mb-4 text-red-600">{errors.name.message}</div>
              )}

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

              <input
                className="mb-2 w-full rounded-md border border-solid border-slate-400"
                placeholder="Phone Number *"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm,
                    message: "Invalid number!  Example: 923351234567",
                  },
                })}
              />
              {errors.phoneNumber && (
                <div className="mb-4 text-red-600">
                  {errors.phoneNumber.message}
                </div>
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
                <div className="mb-4 text-red-600">
                  {errors.password.message}
                </div>
              )}
              <div className="relative">
                <input
                  className="mb-2 mt-2 w-full rounded-md border border-solid border-slate-400"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password *"
                  {...register("confirmPassword", {
                    required: "Enter the Password again",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: {
                      samePassword: (value) =>
                        value === getValues().password ||
                        "Passwords do not match",
                    },
                  })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {showConfirmPassword ? (
                    <EyeIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setShowConfirmPassword(false);
                      }}
                    />
                  ) : (
                    <EyeOffIcon
                      className="h-4 w-4"
                      onClick={() => {
                        setShowConfirmPassword(true);
                      }}
                    />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <div className="mb-4 text-red-600">
                  {errors.confirmPassword.message}
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 text-red-600">{errorMessage}</div>
              )}
            </div>
            <button
              type="submit"
              className="group relative mt-8 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
          <div className="flex space-x-2">
            <p>Already Have an Account </p>
            <a
              href="/sign_in"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Sign In
            </a>
          </div>
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
                fullWidth
                required
                label="Name"
                type="text"
                value={name}
                helperText="Only characters allowed"
                onChange={(e) => {
                  setName(e.target.value.replace(/\d+/g, ""));
                }}
              />
              <TextField
                style={{ paddingBottom: "15px" }}
                fullWidth
                required
                label="Email Address"
                type="email"
                value={email}
                inputProps={{
                  pattern: "^[w-.]+@([w-]+.)+[w-]{2,4}$",
                  title:
                    "Please enter a valid email address. Example: abc@gmail.com",
                }}
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
                inputProps={{
                  pattern: "\\d{11}",
                  title: "Please enter correct phone number",
                }}
                onChange={(e) => {
                  setPhone(e.target.value);
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
            {errorMessage !== "" ? (
              <h1 className="mb-2 font-bold text-red-600">{errorMessage}</h1>
            ) : (
              <></>
            )}
            <div>
              <button
                onClick={signUp}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
          </form> */}
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
