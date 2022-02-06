import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";

const theme = createTheme();

export default function AddProducts() {
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
        <h1>Add a New Product</h1>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Product Name"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Cost Price"
            type="text"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="salePrice"
            label="Sale Price"
            type="text"
            id="salePrice"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="stock"
            label="Stock"
            type="text"
            id="stock"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            type="text"
            id="category"
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
