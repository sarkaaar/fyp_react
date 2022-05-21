import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Sidebar from './admin_components/Sidebar';
import Header from './admin_components/Header';

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
      <Header />
      <div className="">
        <Sidebar />
        <div className="ml-72 flex justify-center">
          <div className="">
            <PersonIcon sx={{ fontSize: 350 }} />
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
      </div>
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
