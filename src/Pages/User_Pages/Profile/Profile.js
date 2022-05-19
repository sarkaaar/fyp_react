import React from "react";
import Header from "../Components/Header";
// import { Link } from "react-router-dom";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ReplayIcon from "@mui/icons-material/Replay";
// import ArticleIcon from "@mui/icons-material/Article";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import { Button } from "@mui/material";
import { TextField } from "@mui/material";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import Sidebar from "./Sidebar";
import PersonIcon from "@mui/icons-material/Person";
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

  return (
    <>
      <Header />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>
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
    </>
  );
}
