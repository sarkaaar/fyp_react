import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { TextField, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { db } from "../../../firebase-config";
import { collection, doc, getDoc, addDoc } from "firebase/firestore";
import UserLayout from "../../../layouts/UserLayout";
import { onAuthStateChanged } from "firebase/auth";
import {  auth } from "../../../firebase-config";
import Modal from "@mui/material/Modal";
import { Box,Typography } from "@mui/material";


export default function ComplainSuggestions() {
  const [description, setDescription] = useState("");
  const [subj, setSubj] = useState("");
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);
  const [complain, setComplain] = useState([]);
  const complainRef = collection(db, "complain");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => {
    setOpen(false);
    navigate("/profile");
  };
  const addComplain = async () => {
    const newObj = {
      subject: subj,
      user: user?.email,
      description,
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

  // const getComplain = async () => {
  //   const q = query(
  //     favouritesRef,
  //     where("user", "==", user?.email),
  //     where("subject", "==", subj)
  //   );

  //   await getDocs(q)
  //     .then((res) => {
  //       setComplain(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //       console.log(res);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  return (
    <UserLayout>
      <div className="flex " />
      <div className="  mt-6">
        <div className="align-center  m-auto ">
          <h1 className="text-center text-3xl">Complaints and Suggestions</h1>
          <div className="w-full">
            <TextField
              margin="normal"
              required
              fullWidth
              label="Subject"
              autoComplete="off"
              value={subj}
              onChange={(e) => setSubj(e.target.value)}
            />

            <TextareaAutosize
              minRows={5}
              placeholder="  Description*"
              className="mt-8 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-6 mb-12"
              onClick={() => {addComplain();
                setOpen(true); }
              
              }

              // className="mt-6 mb-12"
            >
              Submit
            </Button>
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
