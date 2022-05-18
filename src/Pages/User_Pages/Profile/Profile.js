import React, { useState } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplayIcon from "@mui/icons-material/Replay";
import ArticleIcon from "@mui/icons-material/Article";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Sidebar from "./Sidebar";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

import { Fragment } from "react";
import {
  Disclosure,
  Menu,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import { QuestionMarkCircleIcon, SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";

const user = {
  name: "Lisa Marie",
  email: "lisamarie@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: false },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: true },
  { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];
const plans = [
  {
    name: "Startup",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Up to 5 active job postings",
  },
  {
    name: "Business",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Up to 25 active job postings",
  },
  {
    name: "Enterprise",
    priceMonthly: 249,
    priceYearly: 2490,
    limit: "Unlimited active job postings",
  },
];
const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#",
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  // const [passwordModalOpen, SetpasswordModalOpen] = useState(false);
  // const [infoModalOpen, setInfoModalOpen] = useState(false);

  // const handleOpenPasswordModal = () => SetpasswordModalOpen(true);
  // const handleClosePasswordModal = () => SetpasswordModalOpen(false);

  // const handleOpenInfoModal = () => setInfoModalOpen(true);
  // const handleCloseInfoModal = () => setInfoModalOpen(false);

  // return (
  //   <div>
  //     <Header />
  //     <Sidebar />

  //     <div
  //       style={{
  //         width: "30%",
  //         margin: "auto",
  //         border: "1px solid black",
  //         padding: "20px",
  //         marginTop: "20px",
  //         borderRadius: "10px",
  //       }}
  //     >
  //       <h1>Profile</h1>
  //       <div style={{ width: "100px", height: "100px", margin: "auto" }}>
  //         <PersonOutlineIcon
  //           style={{ width: "100px", height: "100px", margin: "auto" }}
  //         />
  //       </div>
  //       <h3>Name</h3>
  //       <p style={{ border: "1px solid black", padding: "10px" }}>
  //         something...
  //       </p>
  //       <h3>Email</h3>
  //       <p style={{ border: "1px solid black", padding: "10px" }}>
  //         something...
  //       </p>
  //       <h3>Password</h3>
  //       <p style={{ border: "1px solid black", padding: "10px" }}>
  //         something...
  //       </p>
  //       <h3>Phone Number</h3>
  //       <p style={{ border: "1px solid black", padding: "10px" }}>
  //         something...
  //       </p>
  //       <div style={{ display: "flex", justifyContent: "space-between" }}>
  //         <Button onClick={handleOpenPasswordModal} variant="contained">
  //           Password Update
  //         </Button>
  //         <Button onClick={handleOpenInfoModal} variant="contained">
  //           Profile Update
  //         </Button>
  //       </div>
  //     </div>

  //     {/* --------------------------------------------------------------------------- */}
  //     {/* MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODAL */}
  //     {/* --------------------------------------------------------------------------- */}

  //     {/* PASSWORD_UPDATE_MODAL PASSWORD_UPDATE_MODAL PASSWORD_UPDATE_MODAL PASSWORD_ */}

  //     <Modal
  //       open={passwordModalOpen}
  //       onClose={handleClosePasswordModal}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //     >
  //       <Box sx={style}>
  //         <div
  //           style={{
  //             border: "1px solid black",
  //             width: "50%",
  //             padding: "20px",
  //             borderRadius: "10px",
  //             margin: "auto",
  //             marginBottom: "50px",
  //           }}
  //         >
  //           <h1>Update Password </h1>
  //           <div style={{ minWidth: "300px" }}>
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Current Password"
  //               type="password"
  //               id="password"
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="New Password"
  //               type="password"
  //               id="password"
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Confirm New Password"
  //               type="password"
  //               id="password"
  //             />
  //             <div style={{ display: "flex", justifyContent: "end" }}>
  //               <Button
  //                 variant="contained"
  //                 style={{
  //                   width: "100px",
  //                   margin: "10px",
  //                   background: "#00579c",
  //                   color: "white`",
  //                 }}
  //               >
  //                 Save
  //               </Button>
  //               <Button
  //                 variant="contained"
  //                 style={{
  //                   width: "100px",
  //                   margin: "10px",
  //                   background: "#d30000",
  //                   color: "white`",
  //                 }}
  //               >
  //                 Cancel
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </Box>
  //     </Modal>

  //     {/* PROFILE_UPDATE_MODAL PROFILE_UPDATE_MODAL PROFILE_UPDATE_MODAL PROFILE_ */}

  //     <Modal
  //       open={infoModalOpen}
  //       onClose={handleCloseInfoModal}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //     >
  //       <Box sx={style}>
  //         <div
  //           style={{
  //             border: "1px solid black",
  //             width: "50%",
  //             padding: "20px",
  //             borderRadius: "10px",
  //             margin: "auto",
  //             marginBottom: "50px",
  //           }}
  //         >
  //           <h1>Update User Info </h1>
  //           <div style={{ minWidth: "300px" }}>
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Name"
  //               type="text"
  //               id="password"
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Email"
  //               type="text"
  //               id="password"
  //             />
  //             <TextField
  //               margin="normal"
  //               required
  //               fullWidth
  //               name="password"
  //               label="Phone #"
  //               type="text"
  //               id="password"
  //             />
  //             <div style={{ display: "flex", justifyContent: "end" }}>
  //               <Button
  //                 variant="contained"
  //                 style={{
  //                   width: "100px",
  //                   margin: "10px",
  //                   background: "#00579c",
  //                   color: "white`",
  //                 }}
  //               >
  //                 Save
  //               </Button>
  //               <Button
  //                 variant="contained"
  //                 style={{
  //                   width: "100px",
  //                   margin: "10px",
  //                   background: "#d30000",
  //                   color: "white`",
  //                 }}
  //               >
  //                 Cancel
  //               </Button>
  //             </div>
  //           </div>
  //         </div>
  //       </Box>
  //     </Modal>
  //   </div>
  // );

  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-full lg:w-1/5">
          <Sidebar />   
        </div>
        <div className="w-full lg:w-4/5">
        <div className="h-full">
        <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <section aria-labelledby="payment-details-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
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

                      <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="cc-given-name"
                            className="mt-1 block w-full border-solid border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 block w-full border-solid border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="security-code"
                            className="flex items-center text-sm font-medium text-gray-700"
                          >
                            <span>Password</span>
                            <QuestionMarkCircleIcon
                              className="ml-1 flex-shrink-0 h-5 w-5 text-gray-300"
                              aria-hidden="true"
                            />
                          </label>
                          <input
                            type="password"
                            name="security-code"
                            id="security-code"
                            autoComplete="cc-csc"
                            className="mt-1 block w-full border-solid border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                        </div>
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

      
    </>
  );
}
