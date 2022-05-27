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
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [queryUser, setQueryUser] = useState([]);

  const [email, setEmail] = useState();
  const [fName, setFName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [phone, setPhone] = useState();
  const [card, setCard] = useState();
  const [NOC, setNOC] = useState();
  const [expiry, setExpiry] = useState();
  const [cvv, setCVV] = useState();
  const [todayDate, setTodayDate] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cartCollection = collection(db, "cart");

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
    today();
    getTotal();
  }, [products]);

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
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();

    getUserInfo();
  }, [user]);

  const checkoutRef = collection(db, "checkout");

  const checkout = async () => {
    const newItem = {
      authUserEamil: user?.email,
      email,
      fName,
      
      address,
      city,
      postal,
      phone,
      card,
      NOC,
      expiry,
      cvv,
      total,
      cart: products,
    };

    await addDoc(checkoutRef, newItem)
      .then((e) => {
        console.log(e);
        console.log("sucessfully Checkout");
        products.map(async (item) => {
          const prod = doc(db, "cart", item?.id);

          await deleteDoc(prod).then(async () => {
            console.log("Product Sucessfully Deleted");

            await getDoc(doc(db, "products", item?.id)).then(async (res) => {
              setProduct({ id: res.id, ...res.data() });
              console.log({ id: res.id, ...res.data() });
            });
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
  const usersRef = collection(db, "users");

  const getUserInfo = async () => {
    if (user) {
      const q = query(usersRef, where("email", "==", user?.email));
      await getDocs(q)
        .then((res) => {
          const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setQueryUser(data[0]);
          setEmail(data[0]?.email);

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
                label="First Name"
                fullWidth
                required
                value={fName}
                onChange={(e) => {
                  setFName(e.target.value);
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
              {/* <TextField
                label="Expiry"
                fullWidth
                required
                type="date"
                value={expiry}
                max={todayDate}
                onChange={(e) => {
                  setExpiry(e.target.value);
                }}
              /> */}
              <div>
                {/* <label for="datemin">Enter a date after 2000-01-01:</label> */}
                <input
                  className="border-box"
                  type="date"
                  placeholder="Expiry"
                  id="datemin"
                  name="datemin"
                  value={expiry}
                  max={todayDate}
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

        <div className="m-2 w-96 p-2">
          <div>
            <h1 className=" text-3xl font-bold">In The Cart</h1>
            {products.length === 0 && (
              <div className="grid h-screen place-items-center">
                <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
              </div>
            )}
            <div>
              {products.map((item, key) => (
                <div key={key} className=" flex w-96 justify-between">
                  <h1 className="m-2 text-xl">
                    {item?.product?.name.split(0, 20)}
                  </h1>
                  <h1 className="m-2 text-xl">{item?.quantity}</h1>
                  <h1 className="m-2 text-xl">{item?.product?.salePrice}</h1>
                  <h1 className="m-2 text-xl">
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
