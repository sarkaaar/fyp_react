import * as React from "react";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import Modal from "@mui/material/Modal";

export default function CheckoutAppointment(params) {
  const navigate = useNavigate();
  const { user, doctor, date, time } = params.obj;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [NOC, setNOC] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [todayDate, setTodayDate] = useState();
  const handleClose = () => {
    setOpen(false);
    navigate("/viewAppointments");
  };
  const appointmentsRef = collection(db, "appointments");

  useEffect(() => {
    today();
  }, []);

  const makeAppointment = async () => {
    const apppointment = {
      user: user?.email,
      doctor,
      date,
      time,
      email,
      card,
      NOC,
      expiry,
      cvv,
    };
    await addDoc(appointmentsRef, apppointment).then((res) => {
      console.log("done added appointent");
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
        ? "0" + String(date.getMonth())
        : date.getMonth();
    const year = date.getFullYear();
    setTodayDate(year + "-" + month + "-" + day);
    console.log(year + "-" + month + "-" + day);
  };

  return (
    <div>
      <div className="flex gap-4 py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Checkout
            </h2>
            <hr />
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-2xl font-bold">Contact Information</h1>
            <TextField
              label="Email Address"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <hr />

            <h1 className="text-2xl font-bold">Payment Information</h1>
            <TextField
              label="Card Number"
              fullWidth
              required
              value={card}
              onChange={(e) => {
                setCard(e.target.value);
              }}
            />
            <TextField
              label="Name on Card"
              fullWidth
              required
              value={NOC}
              onChange={(e) => {
                setNOC(e.target.value);
              }}
            />
            <div className="flex gap-4">
              <div>
                <label>Card Expiry</label>
                <input
                  className="border-box"
                  type="date"
                  placeholder="Expiry"
                  id="datemin"
                  name="datemin"
                  value={expiry}
                  min={todayDate}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                />
              </div>
              <TextField
                label="CVV"
                fullWidth
                required
                value={cvv}
                onChange={(e) => {
                  setCVV(e.target.value);
                }}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{ height: "50px" }}
              onClick={() => {
                makeAppointment();
                setOpen(true);
              }}
            >
              Confirm Appointmnet
            </Button>

            <hr />
          </form>
        </div>

        {/* Appointment Doctor Info */}
        <div className="justify-around p-4">
          <h1 className="mt-4 text-2xl font-bold lg:flex lg:justify-center">
            You are making an appointment with
          </h1>
          <div className="lg:flex lg:justify-center">
            <div className="mt-8  p-2 lg:w-1/2">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200"></ul>
              </div>
            </div>
          </div>

          <div className="">
            <div className="border-t border-gray-200">
              <div className="flex text-base font-medium text-gray-900">
                <p>Dr. </p> <p className="text-gray-700">{doctor.name}</p>
              </div>

              <p className="italic text-gray-600">{doctor.clinicAddress}</p>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Fee</p>
                <p className="text-red-600">{doctor.fees}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute top-1/2	 left-1/2 mt-8 w-96 rounded-lg border-2 border-black bg-white p-4 shadow-lg "
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
            <h1 className="p-4 text-center text-xl font-bold">
              Appointment is Created Successfully
            </h1>
          </div>
          <Button onClick={handleClose}> Close</Button>
        </div>
      </Modal>
    </div>
  );
}
