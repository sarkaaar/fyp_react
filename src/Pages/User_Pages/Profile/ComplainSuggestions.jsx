import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { db } from "../../../firebase-config";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import UserLayout from "../../../layouts/UserLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function ComplainSuggestions() {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const complainRef = collection(db, "complain");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/profile");
  };
  const addComplain = async (data) => {
    const newObj = {
      subject: data.subject,
      user: user?.email,
      description: data.description,
      time: new Date(),
    };
    setLoader(true);
    await addDoc(complainRef, newObj)
      .then(() => {
        setOpen(true);
        console.log("Add To Complain Sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  return (
    <UserLayout>
      <div className="flex " />
      <div className="mt-6">
        <div className="align-center m-auto ">
          <h1 className="text-center text-3xl">Complaints and Suggestions</h1>
          <div className="w-full">
            <form
              onSubmit={handleSubmit((data) => {
                addComplain(data);
              })}
              autoComplete="off"
            >
              <input
                type="text"
                fullWidth
                className="mt-4 mb-2 h-16 w-full rounded-md border border-solid border-gray-400 p-2"
                autoFocus
                placeholder="Write Subject of Complain/Suggestion"
                {...register("subject", {
                  required:
                    "Subject is required to submit a complain/suggestion",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 characters required",
                  },
                })}
              />
              {errors.subject && (
                <p className="px-2 text-base text-red-600">
                  {errors.subject.message}
                </p>
              )}

              <textarea
                rows="6"
                className="mt-4 w-full rounded-md border border-solid border-gray-400 p-2"
                placeholder="Description"
                {...register("description", {
                  required:
                    "Description is required to submit a complain/suggestion",
                  minLength: {
                    value: 15,
                    message: "Minimum 15 characters required",
                  },
                })}
              />
              {errors.description && (
                <p className="px-2 text-base text-red-600">
                  {errors.description.message}
                </p>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded-md border border-transparent bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-lg shadow-blue-400/50 hover:drop-shadow-lg focus:shadow-none"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Complain added Sucessfully
          </Typography>
          <Button onClick={handleClose}> Close</Button>
        </Box>
      </Modal>
    </UserLayout>
  );
}
