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
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
// import * as React from 'react';
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Footer from "./Components/Footer";
import { auth, db } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function Checkout() {
  const [email, setEmail] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [phone, setPhone] = useState();
  const [card, setCard] = useState();
  const [NOC, setNOC] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCVV] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const cartCollection = collection(db, "cart");

  useEffect(() => {
    getTotal();
  }, []);

  const getTotal = () => {
    let num = 0;
    products.map((item) => {
      num += parseInt(item?.product?.salePrice) * parseInt(item?.quantity);
    });
    setTotal(num);
  };
  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setProducts(
      queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(products);
    getTotal();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
    getTotal();
  }, [user]);

  const checkoutRef = collection(db, "checkout");

  const checkout = async () => {
    const newItem = {
      authUserEamil: user?.email,
      email,
      fName,
      lName,
      address,
      city,
      postal,
      phone,
      card,
      NOC,
      expiry,
      cvv,
      cart: products,
    };

    await addDoc(checkoutRef, newItem)
      .then((e) => {
        console.log(e);
        console.log("sucessfully Checkout");
        products.map(async (item) => {
          const prod = doc(db, "cart", item?.id);

          await deleteDoc(prod).then(() => {
            console.log("Product Sucessfully Deleted");
            // for inventory update getDoc(id).then(qty-update karni hay)
          });
          getCartItems();

          console.log(products);
          getTotal();
          setOpen(true);
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Checkout Successfull");
  };

  return (
    <UseMainLayout>
      <div className="min-h-full flex gap-4 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
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
                label="First Name"
                fullWidth
                required
                value={fName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
              />
              <TextField
                label="Last Name"
                fullWidth
                required
                value={lName}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
              />
            </div>
            <TextField
              label="Address"
              fullWidth
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <TextField
              label="City"
              fullWidth
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <TextField
              label="Postal Code"
              fullWidth
              required
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            />
            <TextField
              label="Phone"
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
              <TextField
                label="Expiry"
                fullWidth
                required
                type="date"
                value={expiry}
                onChange={(e) => {
                  setExpiry(e.target.value);
                }}
              />
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
              fullWidth
              variant="outlined"
              style={{ height: "50px" }}
              // onClick={check}
              onClick={checkout}
            >
              Confirm Order
            </Button>

            <hr />
          </form>
        </div>

        <div className="w-96 m-2 p-2">
          <div>
            <h1 className=" text-3xl font-bold">In The Cart</h1>
            {products.length === 0 && (
              <div className="grid place-items-center h-screen">
                <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin" />
              </div>
            )}
            <div>
              {products.map((item, key) => (
                <div key={key} className=" flex justify-between w-96">
                  <h1 className="text-xl m-2">
                    {item?.product?.name.split(0, 20)}
                  </h1>
                  <h1 className="text-xl m-2">{item?.quantity}</h1>
                  <h1 className="text-xl m-2">{item?.product?.salePrice}</h1>
                  <h1 className="text-xl m-2">
                    {parseInt(item?.product?.salePrice) *
                      parseInt(item?.quantity)}
                  </h1>
                </div>
              ))}

              <div>
                <h1>
                  Total = Rs.
                  {total}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className=""
          >
            For Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please Goto profile /cart
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
