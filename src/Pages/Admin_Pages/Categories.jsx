import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdminLayout from "../../layouts/AdminLayout";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import DataTable from "../../components/DataTable";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [getCategory, setGetCategories] = useState([]);
  const categoryRef = collection(db, "categories");

  const getCategories = async () => {
    await getDocs(categoryRef)
      .then((res) => {
        setGetCategories(
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = async () => {
    await addDoc(categoryRef, { name: category }).then(() => {
      getCategories();
    });
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id)).then(() => {
      getCategories();
    });
  };

  return (
    <AdminLayout>
      <div className=" flex justify-center ">
        <div className="flex w-96 flex-col gap-4 ">
          <div className=" w-96 bg-white p-4 ">
            <h1 className="flex justify-center text-lg">Add a New Category</h1>
            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
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
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={addCategory}
              >
                Add Category
              </Button>
            </form>
          </div>
          <hr />
          <hr />
        </div>
      </div>
      <hr />
      <div className="flex justify-center">
        <div className="w-96 bg-gray-50 p-4">
          <h1 className=" text-lg text-center">Categories</h1>

          <DataTable
            data={getCategory}
            columns={[
              { key: "name", name: "Category Name" },
              {
                key: "action",
                name: "Action",
                render: (row) => (
                  <Button
                    onClick={() => {
                      deleteCategory(row.id);
                    }}
                  >
                    DELETE
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
