import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { auth } from "../../firebase-config";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ForgetPassword() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState("");
  const auth = getAuth();
  const forgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log("Email Sent");
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
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
              setEmail(e.target.value);
            }}
            type="email"
          />

          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              forgetPassword();
            }}
          >
            Forget Password
          </button>
        </form>
      </div>
      {/* Modal */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Email Sucessfully Sent
            </Typography>
            <h1 id="transition-modal-description" className="mb-10" sx={{ mt: 2 }}>
              Now you can go the the email to reset your password and again sign
              in.
            </h1>
            <div className="flex justify-end">
            <Link to="/sign_in " className="text-indigo-600 p-4 bg-indigo-200 text-right">
              Sign In
            </Link></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
