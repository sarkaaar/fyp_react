/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase-config";

export default function EditProfile({ data }) {
  const usersCollection = collection(db, "users");

  // Get Sub-Categories Names

  useEffect(() => {
    getProfile();

    () =>
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  }, []);

  const [user, setUser] = useState();
  const [id, setID] = useState(data?.id);
  const [name, setName] = useState(data?.name);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(data?.phone);
  const [password, setPassword] = useState(data?.password);
  // const [phone,setPhone]
  const [profile, setProfile] = useState();
  // Add Products
  const editPofile = async () => {
    const newProfile = {
      name,

      password,
      phone,
    };
    console.log(newProduct);
    const prod = doc(db, "users", id);
    await updateDoc(prod, newProfile);
    console.log("Profile Updated");
  };

  const getProfile = async () => {
    const q = await query(ordersRef, where("authUserEamil", "==", user?.email));
    await getDocs(q)
      .then((res) => {
        setProfile(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(profile);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateProfile = async (id) => {
    const newProfile = {
      name,
      phone,
    };
    const profile = doc(db, "users", id);
    await updateDoc(profile, newProfile);
    console.log("Profile Updated");
  };

  // Search Categories

  return (
    <div className="bg-white py-6 px-4 sm:p-6">
      <div className="flex justify-between">
        <div>
          <h2
            id="payment-details-heading"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Update Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            See and update your profile information.
          </p>
        </div>

        {/* <PersonIcon
          style={{
            width: "172",
            height: "172",
            borderRadius: "50%",
            color: "gray",
            border: "1px solid gray",
          }}
        /> */}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          value={name}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/[^A-Za-z]/gi, "");
            setName({
              value,
            });
            // const re = /^[A-Za-z]+$/;
            // if (e.target.value === "" || re.test(e.target.value)) {
            //   setName(e.target.value);
            // }
            // if (e.target.value.match(/^[A-Za-z ]+$/)) setName(e.target.value);
          }}
          label="Name"
        />
        <div className="flex gap-4">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={phone}
            onChange={(e) => {
              value = { phone };
              if (e.target.value.match(/^[0-9]+$/) && phone.length <= 11)
                setPhone(e.target.value);
            }}
            fullWidth
            label="Phone Number"
          />
        </div>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          value={email}
          disabled
          fullWidth
          label="Email"
        />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          value={data?.password}
          type="password"
          disabled
          fullWidth
          label="Password"
        />

        <button
          onClick={() => {
            updateProfile(id);
          }}
        >
          Edit Profile
        </button>
        <h2
          id="payment-details-heading"
          className="text-lg font-medium leading-6 text-red-600"
        >
          For more changes contact admin{" "}
          <h1 className="text-blue-500">ammarzahid335@gmail.com</h1>
        </h2>
      </div>
    </div>
  );
}
