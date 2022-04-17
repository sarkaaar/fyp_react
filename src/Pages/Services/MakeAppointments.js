import * as React from "react";
import Header from "../User_Pages/Components/Header";
import { TextField, Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MakeAppointments() {
  const appointmentsRef = collection(db, "appointments");
  const { id } = useParams();

  const navigate = useNavigate();
  const timeSlots = [
    "09:00 AM  -  09:15 AM",
    "09:15 AM  -  09:30 AM",
    "09:30 AM  -  10:00 AM",
    "10:00 AM  -  10:15 AM",
    "10:15 AM  -  10:30 AM",
    "10:30 AM  -  10:45 AM",
    "10:45 AM  -  11:00 AM",
    "11:00 AM  -  11:15 AM",
    "11:15 AM  -  11:30 AM",
    "11:30 AM  -  11:45 AM",
    "11:45 AM  -  12:00 AM",
    "12:00 PM  -  12:15 PM",
    "12:15 PM  -  12:30 PM",
    "12:30 PM  -  12:45 PM",
    "12:45 PM  -  01:00 PM",
    "01:00 PM  -  01:15 PM",
    "01:15 PM  -  01:30 PM",
    "01:30 PM  -  01:45 PM",
    "01:45 PM  -  02:00 PM",
  ];

  const [doctor, setDoctor] = useState();
  const [user, setUser] = useState({});

  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const makeAppointment = async () => {
    let apppointment = {
      user: user?.email,
      doctor: doctor,
      date: date,
      time: time,
    };
    await addDoc(appointmentsRef, apppointment).then(() => {
      setOpen(true);
    });
    console.log("Appointment Made Sucessfully");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const getDoctor = async () => {
      await getDoc(doc(db, `doctors/${id}`)).then((res) => {
        setDoctor({ id: res.id, ...res.data() });
      });
    };

    getDoctor();
  }, [false]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/viewAppointments");
  };

  return (
    <div>
      <Header />
      <h1 className="flex justify-center text-3xl font-bold m-6">
        You are making an appointment with &nbsp;
        <span className="text-violet-800"> Dr.{doctor?.name} </span>
      </h1>

      <div style={{ width: "300px", margin: "auto" }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          id="date"
        />
        <FormControl fullWidth style={{ margin: "10px 0" }}>
          <InputLabel id="demo-simple-select-label">Time Slot</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Time Slot"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            {timeSlots.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button fullWidth variant="outlined" onClick={makeAppointment}>
          Submit
        </Button>
      </div>
      <div>
        <h1>Current User Signed In</h1>
        <h1>{user?.email}</h1>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Appointment is created Sucessfully
          </Typography>
          <Button onClick={handleClose}> Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
