import { sendPasswordResetEmail } from "firebase/auth";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config";

export default function ForgetPassword() {
  // const navigate = useNavigate();

  const [email, setemail] = useState("");

  const forgetPassword = () => {
    // setLoading(true);
    sendPasswordResetEmail(auth, value.email)
      .then(() => setEmailSent(true))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10">
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forget Password
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <h2 className="mt-6 text-gray-600">
            Enter Your Email to recieve a password verification code.
          </h2>
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

          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              login();
            }}
          >
            Forget Password
          </button>
        </form>
      </div>
    </div>
  );
}
