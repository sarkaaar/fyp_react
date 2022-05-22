import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { db } from "../../firebase-config";

import AdminLayout from "../../layouts/AdminLayout";

export default function AddCategory() {
  const [currentCategory, setCurrentCategory] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  //  Get Categories Names
  const [cat, setCat] = useState([]);
  const catCollection = collection(db, "categories");

  // Get Sub-Categories Names
  const [sub_cat, setSub_Cat] = useState([]);
  const sub_catCollection = collection(db, "sub-categories");

  // Search Categories
  const getCategories = async () => {
    await getDocs(catCollection)
      .then((res) => {
        setCat(res.docs.map((doc) => doc.data().name));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Search Sub-Categories
  const getSub_Categories = async () => {
    const data = await getDocs(sub_catCollection);
    setSub_Cat(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    // Function Calls
    getCategories();
    getSub_Categories();
  }, []);

  // Add Products
  const addParentCategory = async () => {
    await addDoc(catCollection, { name: category }).then(() => {
      getCategories();
      getSub_Categories();
    });
  };

  const addChildCategory = async () => {
    await addDoc(sub_catCollection, { sub_: subCategory, cat_: category }).then(
      () => {
        getCategories();
        getSub_Categories();
      }
    );
  };

  // Delete Categories
  const deleteCategory = async (id) => {
    const subCat_doc = doc(db, "sub-categories", id);
    await deleteDoc(subCat_doc).then(() => {
      getCategories();
      getSub_Categories();
    });
  };

  return (
    <AdminLayout>
        <div className=" flex justify-center ">
          <div className="flex w-96 flex-col gap-4 ">
            <div className=" w-96 bg-white p-4 ">
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
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
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
            <div className="m-auto w-96 bg-white p-4 ">
              <h1 className="flex justify-center text-3xl">
                Add Child Category
              </h1>
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Sub-Category"
                  name="name"
                  value={subCategory}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                />

                <FormControl fullWidth style={{ margin: "10px 0" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    value={category}
                    label="category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {cat.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
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
        </div>
        <hr />
        <div className="flex  w-fit">
          <div className="m-4 bg-white p-4">
            <h1 className="p-4 text-4xl">Parent Categories</h1>
            <hr />

            {cat.map((item) => (
              <div key={item} className="flex justify-between p-4">
                <h1 className="w-96">{item}</h1>
              </div>
            ))}
          </div>
          <hr />
          <div className="m-4 bg-white p-4">
            <h1 className="p-4 text-4xl">Child Categories</h1>
            <hr />

            {sub_cat.map((item) => (
              <div className="flex justify-between p-2 ">
                <h1 className="w-96">{item.sub_}</h1>
                <Button
                  onClick={() => {
                    deleteCategory(item.id);
                  }}
                >
                  DELETE
                </Button>
              </div>
            ))}
          </div>
        </div>
   
    </AdminLayout>
  );
}
