import * as React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Footer from "../User_Pages/Components/Footer";
import { auth, db } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function CheckoutAppointment() {
  const [user, setUser] = useState();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [card, setCard] = useState();
  const [NOC, setNOC] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCVV] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [todayDate, setTodayDate] = useState();

  useEffect(() => {
    today();
  }, []);

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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getUserInfo();
    getCheckoutInfo();
  }, [user]);

  const checkoutRef = collection(db, "checkout");

  const checkout = async () => {
    const newItem = {
      authUserEamil: user?.email,
      email,
      name,
      phone,
      card,
      NOC,
      expiry,
      cvv,
    };
    console.log(newItem);
    await addDoc(checkoutRef, newItem).then((e) => {
      console.log("sucessfully Checkout");
      setOpen(true);
    });
  };
  const usersRef = collection(db, "users");

  const getUserInfo = async () => {
    if (user) {
      const q = query(usersRef, where("email", "==", user?.email));
      await getDocs(q)
        .then((res) => {
          const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setQueryUser(data[0]);
          setEmail(data[0]?.email);
          setPhone(data[0]?.phone);
          setName(data[0]?.name);

          console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getCheckoutInfo = async () => {
    if (user) {
      const q = query(checkoutRef, where("email", "==", user?.email));
      await getDocs(q)
        .then((res) => {
          const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setAddress(data[0]?.address);
          setCity(data[0]?.city);
          setPostal(data[0]?.postal);

          console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <UseMainLayout>
      <div className="flex min-h-full items-center justify-center gap-4 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10">
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
            <h1 className="text-2xl font-bold">Shipping Information</h1>
            <div className="flex gap-4">
              <TextField
                label="Name"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <TextField
              label="Phone"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <hr />
            <h1 className="text-2xl font-bold">Shipping Information</h1>
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
              onClick={checkout}
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
            <div className="mt-8 bg-white  p-2 lg:w-1/2">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200"></ul>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:justify-center">
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:w-1/2">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Fee</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* Modal */}
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className=""
          >
            For Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Goto profile
          </Typography>
          <Link to="/" className="bg-purple-400">
            View Store
            <DoubleArrowIcon />
          </Link>
        </Box>
      </Modal>
    </UseMainLayout>
  );
}
