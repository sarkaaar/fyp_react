import * as React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { db, auth } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";
import CheckoutAppointment from "./CheckoutAppointment";

export default function MakeAppointments() {
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
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  const [doctor, setDoctor] = useState();
  const [user, setUser] = useState({});

  const [booked, setBooked] = useState([]);
  const [cusBooked, setCusBooked] = useState([]);
  // const [success, setSucess] = useState([]);

  const [todayDate, setTodayDate] = useState();
  const [error, setError] = useState("");

  const appointmentsRef = collection(db, "appointments");

  const getDoctor = async () => {
    await getDoc(doc(db, `doctors/${id}`)).then((res) => {
      setDoctor({ id: res.id, ...res.data() });
    });
  };

  const getDoctorAppointments = async () => {
    const q = query(
      appointmentsRef,
      where("doctor.email", "==", doctor?.email),
      where("date", "==", date)
    );
    await getDocs(q).then((res) => {
      setBooked(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const getCustomerAppointments = async () => {
    const q = query(
      appointmentsRef,
      where("user", "==", user?.email),
      where("date", "==", date)
    );
    await getDocs(q).then((res) => {
      setCusBooked(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const today = () => {
    const date = new Date();
    const day =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : date.getDate();

    const month =
      String(date.getMonth()).length === 1
        ? "0" + String(date.getMonth() + 1)
        : date.getMonth();
    const year = date.getFullYear();
    setTodayDate(year + "-" + month + "-" + day);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getDoctor();
  }, [false]);

  useEffect(() => {
    if (!doctor || !date) {
      return;
    }
    today();
    getDoctorAppointments();
    getCustomerAppointments();
  }, [date, time, doctor]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/viewAppointments");
  };

  const [paymentOpen, setPaymentOpen] = useState(false);
  const handlePaymentClose = () => {
    setPaymentOpen(false);
    setOpen(true);
    // navigate("/viewAppointments");
  };

  return (
    <UseMainLayout>
      {doctor ? (
        <div className="mt-20 flex flex-col justify-center items-center">
          <h1 className="flex-wrap text-3xl text-center font-bold">
            You are making an appointment with &nbsp;{" "}
          </h1>
          <span className="text-violet-800 text-center font-bold text-3xl mt-2">
            Dr. {doctor?.name}
          </span>

          <div className=" flex flex-col mt-8 w-96 rounded-lg bg-white p-4">
            <div className="h-12 border shrink border-gray-500 rounded-md">
              <input
                className="focus:border-blue-500 block w-full h-full p-2.5 rounded-md"
                type="date"
                placeholder="Date"
                id="datemin"
                name="datemin"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => {
                  const day = e.target.valueAsDate.getDay();
                  if (day !== 0 && day !== 6) {
                    setError("");
                    setDate(e.target.valueAsDate);
                    getDoctorAppointments();
                    getCustomerAppointments();
                  } else setError("Weekends Cannot be Selected");
                }}
                min={todayDate}
              />
            </div>
            {error && <h1 className="text-red-600 border-none">{error}</h1>}

            <FormControl
              fullWidth
              style={{ margin: "10px 0" }}
              className="shrink"
            >
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
                {timeSlots
                  .filter(
                    (e) =>
                      !booked.find((i) => i.time == e) &&
                      !cusBooked.find((i) => i.time == e)
                  )
                  .map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="outlined"
              className="shrink"
              onClick={() => {
                setPaymentOpen(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid h-screen place-items-center">
          <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
        </div>
      )}

      {/* Succesfull Modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute top-1/2	 left-1/2 bg-white w-96 shadow-lg p-4 mt-8 rounded-lg border-2 border-black "
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Appointment is created Sucessfully
          </Typography>
          <Button onClick={handleClose}> Close</Button>
        </div>
      </Modal>

      {/* Checkout Modal */}

      <Modal
        open={paymentOpen}
        onClose={handlePaymentClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute bg-white  h-10/12 overflow-auto flex mx-96 align-middle shadow-lg  ">
          <CheckoutAppointment obj={{ user, doctor, date, time }} />
        </div>
      </Modal>
    </UseMainLayout>
  );
}
