import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";
import { useState } from "react";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [colors, setColors] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  return (
    <div>
      <Header />
      <div className="w-96 m-auto mt-6">
        <Button
          onClick={() => {
            console.log(colors);
          }}
        >
          Click me
        </Button>
        <h1 className="text-center text-3xl">Add a New Product</h1>
        <div className="">
          <TextField
            margin="normal"
            required
            fullWidth
            id="product_name"
            label="Product Name"
            name="product_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* {costPrice === salePrice ? (
            <p>Cost Price and Sale Price cannot be the same</p>
          ) : (
            <p></p>
          )} */}

          <TextField
            margin="normal"
            required
            fullWidth
            name="cost_price"
            label="Cost Price"
            type="text"
            id="cost_price"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="sale_Price"
            label="Sale Price"
            type="text"
            id="sale_Price"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="stock"
            label="Stock"
            type="text"
            id="stock"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="colors"
            label="Colors"
            type="text"
            id="colors"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="category"
            label="Category"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="sub_category"
            label="Sub-Category (if any)"
            type="text"
            id="sub_category"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <TextareaAutosize
            minRows={10}
            placeholder="  Description*"
            className="mt-8 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
