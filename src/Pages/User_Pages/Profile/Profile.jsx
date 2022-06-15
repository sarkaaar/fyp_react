import React from "react";
import { TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase-config";
import {
  collection,
  getDocs,
  // updateDoc,
  // doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "@mui/material/Modal";
import UserLayout from "../../../layouts/UserLayout";
import EditProfile from "../../../components/EditProfile";
import { Button } from "@mui/material";
import { updatePassword } from "firebase/auth";

export default function Profile() {
  const [queryUser, setQueryUser] = useState([]);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const usersRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getUserInfo();
  }, [user]);

  const getUserInfo = async () => {
    if (user) {
      const q = query(usersRef, where("email", "==", user?.email));
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

  const confPassword = async () => {
    if (password === confirmPassword)
      updatePassword(user, password)
        .then((res) => {
          console.log(res);
          alert("Password update sucessfully");

        })
        .catch((error) => {
          console.log(error);
        });
    else alert("Passwords do not match");
  };

  return (
    <UserLayout>
      <div className="flex justify-center">
        <div className="flex w-full justify-center lg:w-4/5">
          <div className="h-full">
            <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <section aria-labelledby="payment-details-heading">
                    {/* <form action="#" method="POST"> */}
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                      <div className="bg-white py-6 px-4 sm:p-6">
                        <div className="flex justify-between">
                          <div>
                            <h2
                              id="payment-details-heading"
                              className="text-lg font-medium leading-6 text-gray-900"
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
                      <div className="bg-gray-50 px-4 py-3 text-right flex gap-4 sm:px-6">
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
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                    {/* </form> */}
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* update user info modal */}
      <Modal
        sx={{ mb: 70, ml: "auto", mr: "auto" }}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="border-box absolute inset-1/2 h-fit w-96 rounded-xl bg-white p-4 drop-shadow-2xl">
          <Button
            onClick={() => {
              setEditOpen(false);
              window.location.reload(false);
            }}
            sx={{ size: "3xl", mb: 3 }}
          >
            X
          </Button>
          <EditProfile data={queryUser} />
        </div>
      </Modal>
      {/* update passwords */}
      <Modal
        sx={{ mb: 70, ml: "auto", mr: "auto" }}
        open={editPass}
        onClose={() => {
          setEditPass(false);
        }}
      >
        <div className="border-box absolute inset-1/2 h-fit w-96 bg-white p-4 rounded-xl drop-shadow-2xl">
          <h1 className="text-xl font-bold text-center p-4">Update Password</h1>
          <div className="flex flex-col gap-4">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
            />
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              label="Confirm Password"
            />
            {password === confirmPassword ? (
              <></>
            ) : (
              <p className="text-red-600 font-italic">
                Password does not match
              </p>
            )}
            <Button variant="outlined" fullWidth onClick={confPassword}>
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </UserLayout>
  );
}
