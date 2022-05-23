import React from "react";
import { TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase-config";
import EditProfile from "../../../components/EditProfile ";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import UserLayout from "../../../layouts/UserLayout";

export default function Profile() {
  const [queryUser, setQueryUser] = useState([]);
  const [user, setUser] = useState();

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
          setQueryUser(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                            value={queryUser[0]?.name}
                            disabled
                         
                            label="Name"
                          />
                          <div className="flex gap-4">
                            <TextField
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={queryUser[0]?.email}
                              disabled
                              fullWidth
                              label="Email"
                              //  value={queryUser[0]?.email}
                            />
                            <TextField
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={queryUser[0]?.phone}
                              disabled
                              fullWidth
                              label="Phone Number"
                            />
                          </div>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={queryUser[0]?.password}
                            
                            type="password"
                            fullWidth
                            label="Password"
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            console.log(queryUser[0]);
                          }}
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Test
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
    </UserLayout>
  );
}
