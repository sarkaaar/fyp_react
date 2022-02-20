import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Header from "./admin_components/Header";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

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
  const addParentCategory = async () => {
    const newProduct = {};
    await addDoc(categoriesCollection, newProduct);
  };

  const addChildCategory = async () => {
    const newProduct = {};
    await addDoc(sub_categoriesCollection, newProduct);
  };

  return (
    <div>
      <Header />
      <div className="flex mt-4">
        <div style={{ border: "2px solid black", width: "33%" }}>
          <div className=" w-96 mt-24 p-5">
            <h1 className="flex justify-center text-3xl">
              Add Parent Category
            </h1>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Category Name"
                name="name"
                value={category}
                onChange={(e)=>{setCategory(e.target.value)}}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addParentCategory}
              >
                Add Category
              </Button>
            </div>
          </div>
          <hr />
          <div className=" w-96 mt-24 p-5">
            <h1 className="flex justify-center text-3xl">Add Child Category</h1>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Sub-Category"
                name="name"
                value={subCategory}
                onChange={(e)=>{setSubCategory(e.target.value)}}
              />
              {/* <TextField
                margin="normal"
                fullWidth
                name="parent"
                label="Parent Category"
                type="text"
              /> */}

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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={addChildCategory}
              >
                Add Sub-Category
              </Button>
            </div>
          </div>
          <hr />
        </div>
        <hr />
        <div style={{ border: "2px solid black", width: "33%" }}>
          <h1>Parent Categories</h1>
        </div>
        <hr />
        <div style={{ border: "2px solid black", width: "33%" }}>
          <h1>Child Categories</h1>
        </div>
      </div>
    </div>
  );
}
