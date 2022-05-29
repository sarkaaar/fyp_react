import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { collection,doc,deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import AdminLayout from "../../layouts/AdminLayout";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import AddEditProduct from "../../components/admin/inventory/AddEditProduct";


const DeleteProduct = async (id) => {
  const prod = doc(db, "products", id);
  await deleteDoc(prod);
  console.log("Product deleted ", id);
  // getAppointments();
};
export default function Inventory() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <AdminLayout>
        <div className="flex justify-between">
          <h1 className="text-left font-bold text-2xl mb-4">Inventory</h1>
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
            {
              key: "variants",
              name: "Variants",
              render: (row) => (
                <div className="flex flex-col">
                  {Object.entries(row.variants).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <div>{v[0]}</div>
                      <div className="text-right">{v[1]}</div>
                    </div>
                  ))}
                </div>
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
            {
              label: "Delete",
              danger: true,
              perform: (row) => {DeleteProduct(row.id)},
            },
          ]}
        />
      </AdminLayout>

      <Modal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedProduct(undefined);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute inset-1/2 w-96 h-auto border-box bg-white drop-shadow-2xl p-4">
          <AddEditProduct data={selectedProduct} />
        </div>
      </Modal>
    </>
  );
}
