import * as React from "react";
import Header from "../../Components/Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default function ProductReturn() {
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
        <h1>Product Return Form</h1>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Order #"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Product ID"
            type="text"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Product Name"
            type="text"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Issue"
            type="text"
            id="password"
            autoComplete="current-password"
          />

          <TextareaAutosize
            minRows={10}
            placeholder="  Description*"
            style={{ marginTop: "15px", width: "400px" }}
          />
          <p>Click on the "Choose File" button to upload a file:</p>
          <input type="file" name="file" id="file" />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
