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
  const [name, setName] = useState(data?.name);
  const [phone, setPhone] = useState(data?.phone);
  const [password, setPassword] = useState(data?.password);

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
          value={data?.name}
          
          label="Name"
        />
        <button onClick={()=>{console.log(data)}}>Edit Profile</button>
        <div className="flex gap-4">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={data?.email}
          disabled
            fullWidth
            label="Email"
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={data?.phone}
            
            fullWidth
            label="Phone Number"
          />
        </div>
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
         <h2
            id="payment-details-heading"
            className="text-lg font-medium leading-6 text-red-600"
          
          >
            For more changes contact admin <h1 className="text-blue-500">ammarzahid335@gmail.com</h1>
          </h2>
      </div>
    </div>

);
}
