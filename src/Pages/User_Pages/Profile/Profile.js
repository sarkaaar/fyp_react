import React from "react";
import Header from "../Components/Header";
import { TextField } from "@mui/material";
import Sidebar from "./Sidebar";
import PersonIcon from "@mui/icons-material/Person";

export default function Profile() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-64 pt-32">
        <div className="flex justify-center">
          <div className="w-full lg:w-4/5 flex justify-center">
            <div className="h-full">
              <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                  <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                    <section aria-labelledby="payment-details-heading">
                      <form action="#" method="POST">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                          <div className="bg-white py-6 px-4 sm:p-6">
                            <div className="flex justify-between">
                              <div>
                                <h2
                                  id="payment-details-heading"
                                  className="text-lg leading-6 font-medium text-gray-900"
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
                                  borderRadius: "100%",
                                  color: "gray",
                                  border: "1px solid black",
                                }}
                              />
                            </div>

                            <div className="mt-6 flex flex-col gap-4">
                              <TextField fullWidth label="Name" />
                              <div className="flex gap-4">
                                <TextField fullWidth label="Email" />
                                <TextField fullWidth label="Phone Number" />
                              </div>
                              <TextField fullWidth label="Password" />
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                              type="submit"
                              className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </section>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
