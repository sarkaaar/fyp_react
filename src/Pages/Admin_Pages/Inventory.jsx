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
            { key: "stock", name: "Stock" },
            // {
            //   key: "variants",
            //   name: "Variants",
            //   render: (row) => (
            //     <div className="flex flex-col">
            //       {Object.entries(row.variants).map(([k, v]) => (
            //         <div key={k} className="flex justify-between">
            //           <div>{v[0]}</div>
            //           <div className="text-right">{v[1]}</div>
            //         </div>
            //       ))}
            //     </div>
            //   ),
            // },
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
        
      >
        <div className="absolute top-1/2 left-1/2 p-4 shadow-lg rounded-lg bg-white w-[400px] -translate-y-1/2 -translate-x-1/2">
          <AddEditProduct data={selectedProduct} />
        </div>
      </Modal>
    </>
  );
}
