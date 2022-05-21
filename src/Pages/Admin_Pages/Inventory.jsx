import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { IconButton, Button, TextField } from '@mui/material';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

import { db } from '../../firebase-config';
import FirebaseDataTable from '../../components/FirebaseDataTable';
import AdminLayout from '../../layouts/AdminLayout';

export default function Inventory() {
  const [variants, setVariants] = useState([['', 0]]);
  const [sProduct, setSProduct] = useState();
  // Modal
  const [open, setOpen] = React.useState(false);
  const [delOpen, setDelOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleDelClose = () => setDelOpen(false);

  const updateVariant = (v, i) => {
    const tempVariants = [...variants];
    tempVariants[i] = v;
    setVariants(tempVariants);
  };

  const removeVariant = (i) => {
    variants.splice(i, 1);
    setVariants([...variants]);
  };

  const deleteProduct = async (id) => {
    const prod = doc(db, 'products', id);
    await deleteDoc(prod);
    console.log('Product Deleted');
  };

  const updateProduct = async (id) => {
    const prod = doc(db, 'products', id);
    await updateDoc(prod, { capital: true });
    console.log('Product Updated');
  };
  return (
    <>
      <AdminLayout>
        <h1 className="text-left font-bold text-2xl mb-4">Inventory</h1>
        <FirebaseDataTable
          query={collection(db, 'products')}
          columns={[
            { key: 'name', name: 'Name' },
            { key: 'salePrice', name: 'Sale Price' },
            { key: 'costPrice', name: 'Cost Price' },
            { key: 'description', name: 'Description' },
            {
              key: 'variants',
              name: 'Variants',
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
        />
      </AdminLayout>

      {/* Delete Modal */}
      <Modal
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2	w-96 h-fit border-box bg-white drop-shadow-2xl p-4"
          style={{ transform: 'translate(-50%, -50%)' }}
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
      </Modal>

      {/* ------------------------------------------------------------------ */}
      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <div
          className="absolute inset-1/2	w-fit h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <h1 className="mt-2 text-2xl flex justify-center font-bold">
            Update Product
          </h1>
          <h1 className="mt-2 text-xl text-gray-700">
            <span className="text-black font-bold">Product ID:</span>
            {' '}
            {sProduct?.id}
          </h1>

          <div className="flex gap-4">
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Product Name"
                value={sProduct?.name}
                onChange={(e) => setSProduct({
                  name: e.target.value,
                  costPrice: sProduct?.costPrice,
                  salePrice: sProduct?.salePrice,
                  id: sProduct?.id,
                  description: sProduct?.description,
                })}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Cost Price"
                type="text"
                value={sProduct?.costPrice}
                onChange={(e) => setSProduct({
                  name: sProduct?.name,
                  costPrice: e.target.value,
                  salePrice: sProduct?.salePrice,
                  id: sProduct?.id,
                  description: sProduct?.description,
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Sale Price"
                type="text"
                value={sProduct?.salePrice}
                onChange={(e) => setSProduct({
                  name: sProduct?.name,
                  costPrice: sProduct?.costPrice,
                  salePrice: e.target.value,
                  id: sProduct?.id,
                  description: sProduct?.description,
                })}
              />
              <TextareaAutosize
                minRows={10}
                placeholder="  Description*"
                className="mt-8 w-full"
                value={sProduct?.description}
                onChange={(e) => setSProduct({
                  name: sProduct?.name,
                  costPrice: sProduct?.costPrice,
                  salePrice: sProduct?.salePrice,
                  id: sProduct?.id,
                  description: e.target.value,
                })}
              />
            </div>
            <div className="w-96">
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
                    onChange={(e) => updateVariant([variant, e.target.value], i)}
                    value={quantity}
                  />
                  <IconButton onClick={() => removeVariant(i)}>x</IconButton>
                </div>
              ))}
              <Button
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                type="button"
                fullWidth
                variant="contained"
                onClick={() => setVariants([...variants, ['', 0]])}
              >
                Add variant
              </Button>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={updateProduct}
            >
              Submit
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
