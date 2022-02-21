import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [variants, setVariants] = useState([["", 0]]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Variants Add and Remove
  const updateVariant = (v, i) => {
    const tempVariants = [...variants];
    tempVariants[i] = v;
    setVariants(tempVariants);
  };

  const removeVariant = (i) => {
    variants.splice(i, 1);
    setVariants([...variants]);
  };
  // ---------------------------------------------------------------------------------------------------------------------
  // Firebase

  const productsCollection = collection(db, "products");

  //  Get Categories Names
  const [cat, setCat] = useState([]);
  const categoriesCollection = collection(db, "categories");

  // Get Sub-Categories Names
  const [sub_cat, setSub_Cat] = useState([]);
  const sub_categoriesCollection = collection(db, "sub-categories");

  useEffect(() => {
    // Search Categories
    const getCategories = async () => {
      const data = await getDocs(categoriesCollection);
      setCat(data.docs.map((doc) => doc.data().name));
    };

    // Search Sub-Categories
    const getSub_Categories = async () => {
      const data = await getDocs(sub_categoriesCollection);
      setSub_Cat(data.docs.map((doc) => doc.data().name));
    };
    // Function Calls
    getCategories();
    getSub_Categories();
  }, []);

  // Add Products
  const addProduct = async () => {
    // const variants_new = {};
    // variants.map((item) => {
    //   // {...variants_new}
    //   variants_new.push({ var_name: item[0], qty: item[1] });
    // });

    // console.log(variants_new);

    const newProduct = {
      name: name,
      costPrice: costPrice,
      salePrice: salePrice,
      // variants: variants_new,
      category: category,
      subCategory: subCategory,
      description: description,
      // image: image,
    };
    await addDoc(productsCollection, newProduct);
    // navigate('/addPatient');
    // await window.location.reload(false);
  };
  const uploadFiles = (file) => {
    // await addDoc(productsCollection, {});
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
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Cost Price"
            type="text"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Sale Price"
            type="text"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />

          {variants.map(([variant, quantity], i) => (
            <div key={i} className="flex items-center gap-4">
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                label="Varients"
                onChange={(e) => updateVariant([e.target.value, quantity], i)}
                value={variant}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
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

          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              value={category}
              label="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {cat.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
            <Select
              value={subCategory}
              label="category"
              onChange={(e) => {
                setSubCategory(e.target.value);
              }}
            >
              {sub_cat.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextareaAutosize
            minRows={10}
            placeholder="  Description*"
            className="mt-8 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Click on the "Choose File" button to upload a images:</p>
          <input type="file" name="file" id="file" className="mb-6" />
          <button onClick={uploadFiles}>Upload Files</button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-6 mb-12"
            onClick={addProduct}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
