import React from "react";
import { TextField, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import UserLayout from "../../../layouts/UserLayout";
import EditProfile from "../../../components/EditProfile";
import PasswordUpdate from "../../Auth/Component/PasswordUpdate";

export default function Profile() {
  const [queryUser, setQueryUser] = useState([]);
  const [user, setUser] = useState();

  const [editOpen, setEditOpen] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const usersRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getUserInfo(currentUser);
    });
  }, [user]);

  const getUserInfo = async (user) => {
    if (user) {
      const q = query(usersRef, where("email", "==", user?.email));
      await getDocs(q)
        .then((res) => {
          const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setQueryUser(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <UserLayout>
      <div className="flex pl-64">
        <div className="flex w-full justify-center lg:w-4/5">
          <div className="h-full">
            <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                  <section aria-labelledby="payment-details-heading">
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
                          <div className="flex rounded-lg border-2 border-black">
                            <p className="w-24 border-r-2 border-gray-600 px-4 py-2">
                              Name
                            </p>
                            <hr />
                            <p className="px-4 py-2 text-gray-500">
                              {queryUser?.name}
                            </p>
                          </div>
                          <div className="flex rounded-lg border-2 border-black">
                            <p className="w-24 border-r-2 border-gray-600 px-4 py-2">
                              Email
                            </p>
                            <p className="px-4 py-2 text-gray-500">
                              {queryUser?.email}
                            </p>
                          </div>
                          <div className="flex rounded-lg border-2 border-black">
                            <p className="w-24 border-r-2 border-gray-600 px-4 py-2">
                              Phone #
                            </p>
                            <p className="px-4 py-2 text-gray-500">
                              {queryUser?.phone}
                            </p>
                          </div>
                          <div className="flex rounded-lg border-2 border-black">
                            <p className="w-24 border-r-2 border-gray-600 px-4 py-2">
                              Password
                            </p>
                            <p className="px-4 py-2 text-gray-500">********</p>
                          </div>
                        </div>
                      </div>

                      <div className="mx-6 flex gap-4 pb-6">
                        <button
                          onClick={() => {
                            setEditOpen(true);
                          }}
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Update Profile
                        </button>
                        <button
                          onClick={() => {
                            setEditPass(true);
                          }}
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* update user info modal */}
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
        open={editPass}
        onClose={() => {
          setEditPass(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <Button
            onClick={() => {
              setEditPass(false);
              window.location.reload(false);
            }}
            sx={{ size: "3xl", mb: 3 }}
          >
            X
          </Button>
          <PasswordUpdate />
        </div>
      </Modal>
      
    </UserLayout>
  );
}
