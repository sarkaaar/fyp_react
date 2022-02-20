import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [variants, setVariants] = useState([["", 0]]);

  const updateVariant = (v, i) => {
    const tempVariants = [...variants];
    tempVariants[i] = v;
    setVariants(tempVariants);
  };

  const removeVariant = (i) => {
    variants.splice(i, 1);
    setVariants([...variants]);
  };

  return (
    <div>
      <Header />
      <div className="w-96 m-auto mt-6">
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

          <>
            {variants.map(([variant, quantity], i) => (
              <div key={i} className="flex items-center gap-4">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="variant"
                  type="text"
                  id="variant"
                  label="Varients"
                  onChange={(e) => updateVariant([e.target.value, quantity], i)}
                  value={variant}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="quantity"
                  type="text"
                  id="quantity"
                  label="Qunatity"
                  onChange={(e) => updateVariant([variant, +e.target.value], i)}
                  value={quantity}
                />
                <IconButton type="button" onClick={() => removeVariant(i)}>
                  x
                </IconButton>
              </div>
            ))}
            <Button
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              type="button"
              fullWidth
              variant="contained"
              onClick={() => setVariants([...variants, ["", 0]])}
            >
              Add variant
            </Button>
          </>

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
