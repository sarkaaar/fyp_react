import React from "react";
import { TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import PasswordUpdate from "../Auth/Component/PasswordUpdate";

import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "@mui/material/Modal";
import DoctorLayout from "../../layouts/DoctorLayout";
import EditProfile from "./Components/EditProfile";
import { Button } from "@mui/material";

export default function DoctorProfile() {
  const [queryUser, setQueryUser] = useState([]);
  const [user, setUser] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const doctorsRef = collection(db, "doctors");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getUserInfo();
  }, [user]);

  const getUserInfo = async () => {
    if (user) {
      const q = query(doctorsRef, where("email", "==", user?.email));
      await getDocs(q)
        .then((res) => {
          const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setQueryUser(data[0]);
          console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <DoctorLayout>
      <div className="flex justify-center">
        <div className="mt-12  w-1/3 min-w-[500px] max-w-7xl">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div className="flex justify-between">
                <div>
                  <h2
                    id="payment-details-heading"
                    className="text-lg font-medium leading-6 Update Profile
                    text-gray-900"
                  >
                    Profile Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    See and update your profile information.
                  </p>
                </div>

                <PersonIcon
                  style={{
                    width: "172",
                    height: "172",
                    borderRadius: "50%",
                    color: "gray",
                    border: "1px solid gray",
                  }}
                />
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={queryUser?.name}
                  disabled
                  label="Name"
                  style={{ color: "red" }}
                />
                <div className="flex gap-4">
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={queryUser?.email}
                    disabled
                    fullWidth
                    label="Email"
                  />
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={queryUser?.phone}
                    disabled
                    fullWidth
                    label="Phone Number"
                  />
                </div>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={queryUser?.password}
                  disabled
                  type="password"
                  fullWidth
                  label="Password"
                  style={{ color: "red" }}
                />
              </div>
            </div>
            {/* <EditProfile/> */}
            <div className="flex gap-4 bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                onClick={() => {
                  setEditOpen(true);
                }}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Update Profile
              </button>
              <button
                onClick={() => {
                  setEditPass(true);
                }}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <Button
            onClick={() => {
              setEditOpen(false);
            }}
            sx={{ size: "3xl", mb: 3 }}
          >
            X
          </Button>
          <EditProfile data={queryUser} />
        </div>
      </Modal>
      <Modal
        open={editPass}
        onClose={() => {
          setEditPass(false);
        }}
      >
        <PasswordUpdate />
      </Modal>
    </DoctorLayout>
  );
}
