import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Header from "./admin_components/Header";

export default function AddDoctor() {
  return (
    <div>
      <Header />
      <div
        style={{
          margin: "auto",
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
        }}
      >
        <h1>Add a New Doctor</h1>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Doctor Name"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="DOB"
            type="date"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="CNIC"
            type="text"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Phone No."
            type="text"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clinic Name"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clinic Address"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clinic Phone"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Fees"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="commision"
            label="Commision"
            type="number"
            id="commision"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Doctor
          </Button>
        </div>
      </div>
    </div>
  );
}
