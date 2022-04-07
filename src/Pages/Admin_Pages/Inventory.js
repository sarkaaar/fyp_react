import * as React from "react";
import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { IconButton } from "@mui/material";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const productsCollection = collection(db, "products");

  const [variants, setVariants] = useState([["", 0]]);

  const [s_Product, setS_Product] = useState();
  // Modal
  const [open, setOpen] = React.useState(false);
  const [delOpen, setDelOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleDelClose = () => setDelOpen(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, [productsCollection]);

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
    const prod = doc(db, "products", id);
    await deleteDoc(prod);
    console.log("Product Deleted");
  };

  const updateProduct = async (id) => {
    const prod = doc(db, "products", id);
    await updateDoc(prod, { capital: true });
    console.log("Product Updated");
  };
  // render()
  return (
    <>
      <Header />
      <div className="">
        <Sidebar />
        <div className="ml-72">
          <h1 className="text-4xl font-bold m-8">Inventory -{">"}</h1>
          <table className=" w-11/12 m-auto divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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

            {products.map((item, key) => (
              // <ViewInventoryBody obj={item} />
              <>
                <tbody key={key}>
                  <tr>
                    <td className=" text-lg p-2 px-8">{item.name}</td>
                    <td className=" text-lg p-2 px-8">{item.costPrice}</td>
                    <td className=" text-lg p-2 px-8">{item.salePrice}</td>
                    <td className=" text-lg p-2 px-8">{item.description}</td>
                    <td className=" text-lg p-2 px-8">
                      {item &&
                        Object.keys(item.variants).map((key) => {
                          let variant = item?.variants[key];
                          return <tr className="flex justify-between">
                          <td key={key} className=" text-lg p-2 px-8">{variant[0]} </td>
                          <td key={key} className=" text-lg p-2 px-8">{variant[1]} </td>
                  </tr>      
                        })}
                    </td>
                    <td className=" text-lg p-2  flex justify-end">
                      <>
                        <Button
                          onClick={() => {
                            setS_Product(item);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => {
                            setS_Product(item);
                            setDelOpen(true);
                          }}
                        >
                          <DeleteIcon />
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
      {/* ------------------------------------------------------------------ */}
      {/* Delete Modal */}
      <Modal
        open={delOpen}
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
          <h1 id="modal-modal-title" className="mt-2 text-lg font-bold">
            Details
          </h1>
          <h2
            id="modal-modal-description"
            className="mt-2 text-red-600 font-bold"
          >
            {s_Product?.name}
          </h2>
          <div className=" flex gap-4">
            <Button
              color="error"
              onClick={() => {
                deleteProduct(s_Product.id);
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
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 className="mt-2 text-2xl flex justify-center font-bold">
            Update Product
          </h1>
          <h1 className="mt-2 text-xl text-gray-700">
            <span className="text-black font-bold">Product ID:</span>{" "}
            {s_Product?.id}
          </h1>

          <div className="flex gap-4">
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Product Name"
                value={s_Product?.name}
                onChange={(e) =>
                  setS_Product({
                    name: e.target.value,
                    costPrice: s_Product?.costPrice,
                    salePrice: s_Product?.salePrice,
                    id: s_Product?.id,
                    description: s_Product?.description,
                  })
                }
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Cost Price"
                type="text"
                value={s_Product?.costPrice}
                onChange={(e) =>
                  setS_Product({
                    name: s_Product?.name,
                    costPrice: e.target.value,
                    salePrice: s_Product?.salePrice,
                    id: s_Product?.id,
                    description: s_Product?.description,
                  })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Sale Price"
                type="text"
                value={s_Product?.salePrice}
                onChange={(e) =>
                  setS_Product({
                    name: s_Product?.name,
                    costPrice: s_Product?.costPrice,
                    salePrice: e.target.value,
                    id: s_Product?.id,
                    description: s_Product?.description,
                  })
                }
              />
              <TextareaAutosize
                minRows={10}
                placeholder="  Description*"
                className="mt-8 w-full"
                value={s_Product?.description}
                onChange={(e) =>
                  setS_Product({
                    name: s_Product?.name,
                    costPrice: s_Product?.costPrice,
                    salePrice: s_Product?.salePrice,
                    id: s_Product?.id,
                    description: e.target.value,
                  })
                }
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
                    // onChange={(e) =>
                    //   updateVariant([e.target.value, quantity], i)
                    // }
                    // value={variant}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    label="Qunatity"
                    // onChange={(e) => updateVariant([variant, +e.target.value], i)}
                    // value={quantity}
                  />
                  <IconButton onClick={() => removeVariant(i)}>x</IconButton>
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
            <Button fullWidth variant="contained" color="warning">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
