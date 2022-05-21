import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  // deleteDoc,
  // updateDoc,
  // doc,
} from "firebase/firestore";
import AddEditProduct from "../../components/admin/inventory/AddEditProduct";

import { db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import AdminLayout from "../../layouts/AdminLayout";
// import { Button } from "rsuite";
// import { Modal } from "@material-ui/core";

export default function Inventory() {
  // const [variants, setVariants] = useState([["", 0]]);
  // const [sProduct, setSProduct] = useState();
  // Modal
  // const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [editOpen, setEditOpen] = useState(false);

  // const handleClose = () => setOpen(false);

  // const updateVariant = (v, i) => {
  //   const tempVariants = [...variants];
  //   tempVariants[i] = v;
  //   setVariants(tempVariants);
  // };

  // const removeVariant = (i) => {
  //   variants.splice(i, 1);
  //   setVariants([...variants]);
  // };

  // const deleteProduct = async (id) => {
  //   const prod = doc(db, "products", id);
  //   await deleteDoc(prod);
  //   console.log("Product Deleted");
  // };

  // const updateProduct = async (id) => {
  //   const prod = doc(db, 'products', id);
  //   await updateDoc(prod, { capital: true });
  //   console.log('Product Updated');
  // };
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
              label: 'Edit',
              perform: (row) => {
                setSelectedProduct(row);
                setEditOpen(true);
              },
            }, {
              label: 'Delete',
              danger: true,
              perform: (row) => console.log(row),
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
        <div className="absolute inset-1/2 w-96 h-fit border-box bg-white drop-shadow-2xl p-4">
          <AddEditProduct data={selectedProduct} />
        </div>
      </Modal>

      {/* Delete Modal */}
      {/* <Modal
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2 w-96 h-fit border-box bg-white drop-shadow-2xl p-4"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 id="modal-modal-title" className="mt-2 text-xl">
            Delete Product
          </h1>
          <h2 id="modal-modal-description" className="mt-2 text-lg">
            Are you Sure You want to delete the Product. This Process cannot be
            reversed.
          </h2>
          <h1 id="modal-modal-title" className="mt-2 text-lg font-bold">
            Details
          </h1>
          <h2
            id="modal-modal-description"
            className="mt-2 text-red-600 font-bold"
          >
            {sProduct?.name}
          </h2>
          <div className=" flex gap-4">
            <Button
              color="error"
              onClick={() => {
                deleteProduct(sProduct.id);
              }}
              fullWidth
              variant="contained"
            >
              Yes
            </Button>
            <Button
              onClick={handleDelClose}
              color="primary"
              fullWidth
              variant="contained"
            >
              No
            </Button>
          </div>
        </div>
      </Modal> */}
    </>
  );
}
