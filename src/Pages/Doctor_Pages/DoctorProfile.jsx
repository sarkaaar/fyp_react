import React from "react";
import { TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "@mui/material/Modal";
import DoctorLayout from "../../layouts/DoctorLayout";
import EditProfile from "../../components/EditProfile";
import { Button } from "@mui/material";

export default function DoctorProfile() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [editOpen, setEditOpen] = useState(false);

  const [queryUser, setQueryUser] = useState([]);
  const [user, setUser] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const handleClose = () => {
    setEditOpen(false);
  };

  const doctorsRef = collection(db, "doctors");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getUserInfo();
  }, [user]);

  const getUserInfo = async () => {
    if (user) {
      const q = query(doctorsRef , where("email", "==", user?.email));
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
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          onClick={() => {
                            setEditOpen(true);
                          }}
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Edit Profile
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

      <Modal
        sx={{ mb: 70, ml: "auto", mr: "auto" }}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedProduct(undefined);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="border-box absolute inset-1/2 h-fit w-96 bg-white p-4 drop-shadow-2xl">
          <Button
            onClick={() => {
              setEditOpen(false);
            }}
            sx={{size:"3xl", mb:3}}
          >
            X
          </Button>
          <EditProfile data={queryUser} />
        </div>
      </Modal>
    </DoctorLayout>
  );
}
