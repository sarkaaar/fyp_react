import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Header from "../admin_components/Header";

export default function AddCategory() {
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
        <h1>Add a New Category</h1>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Category Name"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="parent"
            label="Parent Category (if any)"
            type="text"
            id="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Category
          </Button>
        </div>
      </div>
    </div>
  );
}
