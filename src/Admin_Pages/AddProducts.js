import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";
import { useState } from "react";

export default function AddProducts() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCostPrice, setProductCostPrice] = useState("");
  const [productSalePrice, setProductSalePrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [colors, setColors] = useState("");
  const [subCategory, setSubCategory] = useState("");

  return (
    <div>
      <Header />
      <div className="w-96 m-auto mt-8">
        <h1 className="text-center text-3xl">Add a New Product</h1>
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="product_name"
            label="Product Name"
            name="product_name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cost_price"
            label="Cost Price"
            type="text"
            id="cost_price"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="sale_Price"
            label="Sale Price"
            type="text"
            id="sale_Price"
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
            name="colors"
            label="Colors"
            type="text"
            id="colors"
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
          <TextField
            margin="normal"
            fullWidth
            name="sub_category"
            label="Sub-Category (if any)"
            type="text"
            id="sub_category"
          />
          <TextareaAutosize
            minRows={10}
            placeholder="  Description*"
            className="mt-8 w-full"
          />
          <p>Click on the "Choose File" button to upload a images:</p>
          <input type="file" name="file" id="file" className="mb-6" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-6 mb-12"
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
