import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import AdminLayout from "../../layouts/AdminLayout";

export default function AdminProfile() {
  // Edit Info
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  // Edit Password
  const [passOpen, setPassOpen] = React.useState(false);
  const handlePassClose = () => setPassOpen(false);
  // Deactivate Modal
  const [activeOpen, setActiveOpen] = React.useState(false);
  const handleActiveClose = () => setActiveOpen(false);

  return (
    <>
      <AdminLayout>
      <div className="flex justify-between">
        <h1 className="mb-4 text-left text-2xl font-bold">Profile</h1>
      </div>
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
                            // value={queryUser[0]?.name}
                            disabled
                         
                            label="Name"
                          />
                          <div className="flex gap-4">
                            <TextField
                              InputLabelProps={{
                                shrink: true,
                              }}
                              // value={queryUser[0]?.email}
                              disabled
                              fullWidth
                              label="Email"
                            />
                            <TextField
                              InputLabelProps={{
                                shrink: true,
                              }}
                              // value={queryUser[0]?.phone}
                              disabled
                              fullWidth
                              label="Phone Number"
                            />
                          </div>
                          <TextField
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // value={queryUser[0]?.password}
                            disabled
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
                          // onClick={() => {
                          //   console.log(queryUser[0]);
                          // }}
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
      {/* <div className="">
        <div className="flex justify-center">
          <div className="">
            <PersonIcon sx={{ fontSize: 150 }} />
            <div className="flex mb-4">
              <div>
                <h1 className="text-xl font-bold p-1">Name</h1>
                <h1 className="text-xl font-bold p-1">username</h1>
                <h1 className="text-xl font-bold p-1">Email</h1>
                <h1 className="text-xl font-bold p-1">Role</h1>
                <h1 className="text-xl font-bold p-1">Address</h1>
                <h1 className="text-xl font-bold p-1">Password</h1>
              </div>
              <div>
                <h2 className="text-xl p-1 ml-4 ">Abdul Wali</h2>
                <h2 className="text-xl p-1 ml-4 ">waliabdul144</h2>
                <h2 className="text-xl p-1 ml-4 ">waliabdul144@gmail.com</h2>
                <h2 className="text-xl p-1 ml-4 ">Admin</h2>
                <h2 className="text-xl p-1 ml-4 ">Lahore</h2>
                <h2 className="text-xl p-1 ml-4 ">********</h2>
              </div>
            </div>
            <div className=" flex gap-4 mb-4">
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setOpen(true);
                }}
              >
                Update Info
              </Button>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={() => {
                  setPassOpen(true);
                }}
              >
                Update Password
              </Button>
            </div>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => {
                setActiveOpen(true);
              }}
            >
              Deactivate Account
            </Button>
          </div>
        </div>
      </div> */}
      </AdminLayout>
      {/* Modals */}
      {/* -------------------------------------------------------------- */}
      {/* Edit info Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2	w-96 h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <h1 id="modal-modal-title" className="mt-2 text-xl">
            Update User Info
          </h1>
          <TextField margin="normal" required fullWidth label="Name" />
          <TextField margin="normal" required fullWidth label="username" />
          <TextField margin="normal" required fullWidth label="Email" />
          <TextField margin="normal" required fullWidth label="Adress" />
          <div className="mt-2 flex gap-4">
            <Button color="primary" fullWidth variant="contained">
              Save
            </Button>
            <Button color="warning" fullWidth variant="contained">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      {/* Edit Pasword Modal */}
      <Modal
        open={passOpen}
        onClose={handlePassClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2	w-96 h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <h1 id="modal-modal-title" className="mt-2 text-xl">
            Update Password
          </h1>
          <TextField margin="normal" required fullWidth label="Password" />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Retype Password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Enter old password"
          />
          <div className="mt-2 flex gap-4">
            <Button color="primary" fullWidth variant="contained">
              Update
            </Button>
            <Button color="warning" fullWidth variant="contained">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      {/* Deactivate Account Modal */}
      <Modal
        open={activeOpen}
        onClose={handleActiveClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2	w-96 h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <h1 id="modal-modal-title" className="mt-2  font-bold text-2xl">
            Deactivate Your Account
          </h1>
          <h1 id="modal-modal-title" className="mt-2 text-xl">
            Are you Sure you want to deactivate your account. This process cnnor
            be undone. Click yes to Continue
          </h1>
          <div className="mt-2 flex gap-4">
            <Button color="error" fullWidth variant="contained">
              Yes
            </Button>
            <Button color="primary" fullWidth variant="contained">
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
