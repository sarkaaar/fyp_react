import React, { useState } from "react";
import Header from "../Components/Header";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Profile() {
  const [passwordModalOpen, SetpasswordModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleOpenPasswordModal = () => SetpasswordModalOpen(true);
  const handleClosePasswordModal = () => SetpasswordModalOpen(false);

  const handleOpenInfoModal = () => setInfoModalOpen(true);
  const handleCloseInfoModal = () => setInfoModalOpen(false);

  return (
    <div>
      <Header />

      <div
        style={{
          width: "30%",
          margin: "auto",
          border: "1px solid black",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>Profile</h1>
        <div style={{ width: "100px", height: "100px", margin: "auto" }}>
          <PersonOutlineIcon
            style={{ width: "100px", height: "100px", margin: "auto" }}
          />
        </div>
        <h3>Name</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <h3>Email</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <h3>Password</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <h3>Phone Number</h3>
        <p style={{ border: "1px solid black", padding: "10px" }}>
          something...
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleOpenPasswordModal} variant="contained">
            Password Update
          </Button>
          <Button onClick={handleOpenInfoModal} variant="contained">
            Profile Update
          </Button>
        </div>
      </div>

      {/* --------------------------------------------------------------------------- */}
      {/* MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODALS_MODAL */}
      {/* --------------------------------------------------------------------------- */}

      {/* PASSWORD_UPDATE_MODAL PASSWORD_UPDATE_MODAL PASSWORD_UPDATE_MODAL PASSWORD_ */}

      <Modal
        open={passwordModalOpen}
        onClose={handleClosePasswordModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              border: "1px solid black",
              width: "50%",
              padding: "20px",
              borderRadius: "10px",
              margin: "auto",
              marginBottom: "50px",
            }}
          >
            <h1>Update Password </h1>
            <div style={{ minWidth: "300px" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Current Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Confirm New Password"
                type="password"
                id="password"
              />
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    margin: "10px",
                    background: "#00579c",
                    color: "white`",
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    margin: "10px",
                    background: "#d30000",
                    color: "white`",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* PROFILE_UPDATE_MODAL PROFILE_UPDATE_MODAL PROFILE_UPDATE_MODAL PROFILE_ */}

      <Modal
        open={infoModalOpen}
        onClose={handleCloseInfoModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              border: "1px solid black",
              width: "50%",
              padding: "20px",
              borderRadius: "10px",
              margin: "auto",
              marginBottom: "50px",
            }}
          >
            <h1>Update User Info </h1>
            <div style={{ minWidth: "300px" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Name"
                type="text"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Email"
                type="text"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Phone #"
                type="text"
                id="password"
              />
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    margin: "10px",
                    background: "#00579c",
                    color: "white`",
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    margin: "10px",
                    background: "#d30000",
                    color: "white`",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
