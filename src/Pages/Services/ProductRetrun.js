import * as React from "react";
import Header from "../User_Pages/Components/Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const product_Return_Collection = collection(db, "productReturn");

// Add Products
const productReturn = async () => {
  const newProduct = {};
  await addDoc(product_Return_Collection, newProduct);
};

export default function ProductReturn() {
  const [orderNo, setOrderNo] = useState("");
  const [productID, setProductID] = useState("");
  const [produName, setProductNme] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

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
            label="Order #"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Product ID"
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Product Name"
            type="text"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Issue"
            type="text"
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
            onClick={productReturn}
          >
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  );
}
