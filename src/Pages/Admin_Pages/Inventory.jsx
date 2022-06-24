import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import AdminLayout from "../../layouts/AdminLayout";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import AddEditProduct from "../../components/admin/inventory/AddEditProduct";

export default function Inventory() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const DeleteProduct = async (id) => {
    const prod = doc(db, "products", id);
    await deleteDoc(prod).then(() => {
      setOpen(true);
      console.log("clicked");
    });
    console.log("Product deleted ", id);
  };

  return (
    <>
      <AdminLayout>
        <div className="flex justify-between">
          <h1 className="mb-4 text-left text-2xl font-bold">Inventory</h1>
          <Button
            onClick={() => {
              setEditOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
        <FirebaseDataTable
          query={collection(db, "products")}
          columns={[
            { key: "name", name: "Name" },
            { key: "salePrice", name: "Sale Price" },
            { key: "costPrice", name: "Cost Price" },
            { key: "description", name: "Description" },
            { key: "stock", name: "Stock" },
            {
              key: "Delete",
              name: "Delete",
              render: (row) => (
                <button
                  className="text-red-600"
                  onClick={() => {
                    DeleteProduct(row.id);
                  }}
                >
                  Delete
                </button>
              ),
            },
          ]}
          actions={[  
            {
              label: "Edit",
              perform: (row) => {
                setSelectedProduct(row);
                setEditOpen(true);
              },
            },
          ]}
        />
      </AdminLayout>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
            Product Deleted Successfully
          </h1>
        </div>
      </Modal>
      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedProduct(undefined);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <AddEditProduct data={selectedProduct} />
        </div>
      </Modal>
    </>
  );
}
