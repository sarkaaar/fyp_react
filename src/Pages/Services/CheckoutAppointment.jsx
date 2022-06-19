import * as React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase-config";

export default function CheckoutAppointment(params) {
  const { user, doctor, date, time } = params.obj;

  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [NOC, setNOC] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [todayDate, setTodayDate] = useState();

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
      // conole.log(res);
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
              onClick={makeAppointment}
            >
              Confirm Order
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

              <p className="text-gray-600 italic">{doctor.clinicAddress}</p>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Fee</p>
                <p className="text-red-600">{doctor.fees}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
