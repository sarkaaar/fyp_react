import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Header from "../admin_components/Header";

export default function AddCategory() {
  return (
    <div>
      <Header />
      <div className="m-auto w-96 mt-24 border-2 border-gray-400 p-5">
        <h1 className="flex justify-center text-3xl">Add a New Category</h1>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Category Name"
            name="name"
            
          />
          <TextField
            margin="normal"
            fullWidth
            name="parent"
            label="Parent Category (if any)"
            type="text"
            id="parent_name"
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
