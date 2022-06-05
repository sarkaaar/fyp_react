import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
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
import { useForm } from "react-hook-form";
import { Backdrop, Box, Modal, Typography, Fade } from "@mui/material";

export default function AddCategory() {
  const [getCategory, setGetCategories] = useState([]);
  const categoryRef = collection(db, "categories");
  const [showModal1, setShowModal1] = useState(false);
  const handleClose1 = () => setShowModal1(false);
  const [showModal2, setShowModal2] = useState(false);
  const handleClose2 = () => setShowModal2(false);
  const [showModal3, setShowModal3] = useState(false);
  const handleClose3 = () => setShowModal3(false);
  const [deleteId, setDeleteId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getCategories = async () => {
    await getDocs(categoryRef)
      .then((res) => {
        setGetCategories(
          res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log(getCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const checkDuplication = (newCategory) => {
    let check = true;
    getCategory.forEach((item) => {
      if (item.name === newCategory) {
        check = false;
      }
    });
    return check;
  };

  const addCategory = async (data) => {
    console.log(showModal1);
    await addDoc(categoryRef, { name: data.category }).then(() => {
      getCategories();
    });
    setShowModal1(true);
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id)).then(() => {
      getCategories();
      setShowModal3(true);
    });
  };
  console.log(errors);
  return (
    <AdminLayout>
      <div className="flex justify-center">
        <div className="flex w-96 flex-col gap-4">
          <div className=" w-96 bg-white p-4">
            <h1 className="flex justify-center text-lg">Add a New Category</h1>
            <form
              className="mt-8 space-y-6"
              autoComplete="off"
              onSubmit={handleSubmit((data) => {
                addCategory(data);
              })}
            >
              <input
                type="text"
                className="mt-4 mb-2 h-14 w-full rounded-md border border-solid border-gray-400 p-2"
                placeholder="Category Name*"
                {...register("category", {
                  validate: (v) =>
                    checkDuplication(v) || "Category already exists",
                  required: "Category Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              {errors.category && (
                <p className="px-2 text-base text-red-600">
                  {errors.category.message}
                </p>
              )}
              <button
                type="submit"
                className="mt-4 h-12 w-full rounded-md border border-transparent bg-blue-700 text-white shadow-md shadow-blue-400/50 hover:drop-shadow-lg focus:shadow-none"
              >
                Add Category
              </button>
            </form>
          </div>
          <hr />
          <hr />
        </div>
      </div>
      <hr />
      <div className="flex justify-center">
        <div className="w-96 bg-gray-50 p-4">
          <h1 className=" text-center text-lg">Categories</h1>
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
                      setDeleteId(row.id);
                      setShowModal2(true);
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal1}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: "24px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <hr className="my-2 bg-black " />
            <h1 className="mb-4 text-center text-lg font-bold">
              Category Added Successfully
            </h1>
            <div className="flex items-center justify-center">
              <button
                className="h-12 w-1/3 bg-blue-600 shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
                onClick={() => {
                  setShowModal1(false);
                }}
              >
                OK
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal2}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: "24px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <svg
                className="h-8 w-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <hr className="my-2 bg-black " />
            <h1 className="mb-4 text-center text-lg font-bold">
              Are you sure you want to delete this category?
            </h1>
            <div className="flex items-center justify-between">
              <button
                className="h-12 w-1/3 bg-blue-600 shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
                onClick={() => {
                  deleteCategory(deleteId);
                  setShowModal2(false);
                }}
              >
                Yes
              </button>
              <button
                className="h-12 w-1/3 bg-red-600 shadow-md shadow-slate-400 hover:bg-red-700 hover:drop-shadow-lg focus:shadow-none"
                onClick={() => {
                  setShowModal2(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal3}
        onClose={handleClose3}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal3}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: "24px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <hr className="my-2 bg-black " />
            <h1 className="mb-4 text-center text-lg font-bold">
              Category Deleted Successfully
            </h1>
            <div className="flex items-center justify-center">
              <button
                className="h-12 w-1/3 bg-blue-600 shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
                onClick={() => {
                  setShowModal3(false);
                }}
              >
                OK
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </AdminLayout>
  );
}
