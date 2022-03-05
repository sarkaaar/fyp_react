import * as React from "react";
import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const productsCollection = collection(db, "products");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [delopen, setDelOpen] = React.useState(false);
  const handleDelOpen = () => setDelOpen(true);
  const handleDelClose = () => setDelOpen(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => doc.data()));
      console.log(products);
    };

    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    const prod = doc(db, "products", id);
    await deleteDoc(prod);
    console.log("Category Deleted");
  };

  const updateProduct = async (id) => {
    const prod = doc(db, "products", id);
    await updateDoc(prod, { capital: true });
    console.log("Category Deleted");
  };

  return (
    <>
      <Button
        onClick={() => {
          console.log(products);
        }}
      >
        Click
      </Button>
      <Header />
      <div className="">
        <Sidebar />
        <div className="ml-72">
          <h1 className="text-4xl font-bold m-8">Inventory -{">"}</h1>
          <table class=" w-11/12 m-auto divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            {/* <ViewInventoryHead /> */}
            <thead className="p-4 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-xl p-2 px-8">Name</th>
                <th className="text-xl p-2 px-8">Sale Price</th>
                <th className="text-xl p-2 px-8">Cost Price</th>
                <th className="text-xl p-2 px-8">Description</th>
                <th className="text-xl p-2 px-8">Stock</th>
                <th className="text-xl p-2 ">Actions</th>
              </tr>
            </thead>

            {products.map((item) => (
              // <ViewInventoryBody obj={item} />
              <>
                <tbody>
                  <tr>
                    <td className=" text-lg p-2 px-8">{item.name}</td>
                    <td className=" text-lg p-2 px-8">{item.costPrice}</td>
                    <td className=" text-lg p-2 px-8">{item.salePrice}</td>
                    <td className=" text-lg p-2 px-8">{item.description}</td>
                    <td className=" text-lg p-2 px-8">{item.stock}</td>
                    <td className=" text-lg p-2  flex justify-end">
                      <>
                        <Button onClick={handleOpen}>
                          <EditIcon />
                        </Button>
                        <Button>
                          <DeleteIcon onClick={handleDelOpen} />
                        </Button>
                      </>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        open={delopen}
        onClose={handleDelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2	w-96 h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 id="modal-modal-title" className="mt-2 text-xl">
            Delete Product
          </h1>
          <h2 id="modal-modal-description" className="mt-2 text-lg">
            Are you Sure You want to delete the Product. This Process cannot be
            reversed.
          </h2>
        </div>
      </Modal>
      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <div
          className="absolute inset-1/2	w-96 h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 className="mt-2 text-xl">Update Product</h1>

          <TextField
            margin="normal"
            fullWidth
            label="Product Name"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField margin="normal" fullWidth label="Cost Price" />
          <TextField margin="normal" fullWidth label="Sale Price" />
          <Button variant="contained" fullWidth>
            ] Save
          </Button>
        </div>
      </Modal>
    </>
  );
}
