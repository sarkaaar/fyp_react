import * as React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { Modal, Fade, Box, Backdrop } from "@mui/material";
import { useState, useEffect } from "react";
import { db, auth, storage } from "../../../firebase-config";
import UserLayout from "../../../layouts/UserLayout";
import { useForm } from "react-hook-form";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};

export default function ProductReturnForm() {
  const [user, setUser] = useState();
  const [progress, setProgress] = useState();
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  function uploadImages(images) {
    setModal(true);
    setLoader(true);
    if (!images.image[0]) return false;
    else {
      const arr = [];
      for (let i = 0; i < images.image.length; i += 1) {
        const storageRef = ref(
          storage,
          `returnedProducts/${images.image[i].name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, images.image[i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setProgress(prog);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              arr.push(url);
              // setUrls(arr);
              console.log(arr);
              addReturnedProduct(images, arr);
            });
          }
        );
      }
    }
  }

  async function addReturnedProduct(data, arr) {
    // console.log("here", urls);
    if (arr.length === data.image.length) {
      const newProduct = {
        orderNo: data.orderNumber,
        productID: data.productID,
        productName: data.productName,
        issue: data.issue,
        description: data.description,
        images: arr,
        user: user?.email,
        date: new Date(),
      };
      await addDoc(productReturnRef, newProduct).then(()=> {
        console.log("Product Returned successfull");
        setLoader(false);
      });
    }
  }

  const productReturnRef = collection(db, "productReturn");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  return (
    <UserLayout>
      <div className="flex w-full justify-center">
        <div className=" flex flex-col justify-center rounded-lg bg-white p-2">
          <h1 className=" flex justify-center text-2xl font-bold">
            Product Return Form
          </h1>
          <div className="flex">
            <div className="w-full">
              <form
                autoComplete="off"
                onSubmit={handleSubmit((data) => {
                  uploadImages(data);
                })}
              >
                <div className="flex flex-row">
                  <div className="mx-4 flex w-1/2 flex-col">
                    <input
                      className="mt-4 mb-1 w-full rounded-md border border-solid border-gray-400 focus:border-blue-500"
                      type="text"
                      placeholder="Order#"
                      {...register("orderNumber", {
                        required: "Please enter the order number in the field.",
                        maxLength: {
                          value: 20,
                          message:
                            "Order number must not be more than 20 characters long.",
                        },
                        minLength: {
                          value: 20,
                          message:
                            "Order number must not be less than 20 characters long.",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9 ]+$/,
                          message:
                            "Order number must contain both numbers and letters only.",
                        },
                      })}
                    />
                    {errors.orderNumber && (
                      <p className="px-2 text-xs text-base text-red-600">
                        {errors.orderNumber.message}
                      </p>
                    )}
                    <input
                      className="mt-6 mb-1 w-full rounded-md border border-solid border-gray-400 focus:border-blue-500"
                      type="text"
                      placeholder="Product ID"
                      {...register("productID", {
                        required: "Please enter the product ID in the field.",
                        maxLength: {
                          value: 20,
                          message:
                            "Product ID must not be more than 20 characters long.",
                        },
                        minLength: {
                          value: 20,
                          message:
                            "Product ID must not be less than 20 characters long.",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9 ]+$/,
                          message:
                            "Product ID must contain both numbers and letters only.",
                        },
                      })}
                    />
                    {errors.productID && (
                      <p className="px-2 text-sm text-red-600">
                        {errors.productID.message}
                      </p>
                    )}
                    <input
                      className="mt-6 mb-1 w-full rounded-md border border-solid border-gray-400 focus:border-blue-500"
                      type="text"
                      placeholder="Product Name"
                      {...register("productName", {
                        required: "Please enter the product name in the field.",
                        minLength: {
                          value: 4,
                          message:
                            "Product name cannot be less than 4 letters long.",
                        },
                      })}
                    />
                    {errors.productName && (
                      <p className="px-2 text-sm text-red-600">
                        {errors.productName.message}
                      </p>
                    )}
                    <input
                      className="mt-6 mb-1 w-full rounded-md border border-solid border-gray-400 focus:border-blue-500"
                      type="text"
                      placeholder="Issue Subject"
                      {...register("issue", {
                        required:
                          "Please enter the issue subject in the field.",
                        minLength: {
                          value: 3,
                          message: "Please enter issue subject properly.",
                        },
                      })}
                    />
                    {errors.issue && (
                      <p className="px-2 text-sm text-red-600">
                        {errors.issue.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-1/2 flex-col px-2">
                    <textarea
                      rows={4}
                      className="mt-4 mb-1 w-full rounded-md border border-solid border-gray-400 focus:border-blue-500"
                      type="text"
                      placeholder="Description"
                      {...register("description", {
                        required: "Please describe the issue with the product.",
                        minLength: {
                          value: 20,
                          message:
                            "Please describe the issue in detail.(Minimum 20 charactrs)",
                        },
                      })}
                    />
                    {errors.description && (
                      <p className="px-2 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                    <p className="mt-4">
                      Click on the &quot;Choose File&quot; button to upload a
                      file:
                    </p>

                    <input
                      type="file"
                      className="mb-1"
                      {...register("image", {
                        required: "Please upload an image.",
                      })}
                      // onChange={(e) => {
                      //   setImage(e.target.files);
                      // }}
                      multiple
                    />
                    {errors.image && (
                      <p className="px-2 text-sm text-red-600">
                        {errors.image.message}
                      </p>
                    )}
                    {progress ? <h3>Uploaded: {progress}%</h3> : null}
                    {/* <button
                      className="w-full bg-blue-500"
                      onClick={upload}
                    >
                      Upload Image
                    </button> */}
                    <button
                      type="submit"
                      className="h-12 w-36 border border-solid border-blue-600 bg-blue-600 text-xs text-white shadow-lg shadow-slate-300 transition delay-100 duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:drop-shadow-lg focus:shadow-none active:scale-75"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={() => setModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Box sx={modalStyle}>
            {loader ? (
              <div className="w-full">
                <div className="flex h-full items-center justify-center">
                  <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
                </div>
              </div>
            ) : (
              <>
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
                  Your application has been submitted successfully!
                </h1>
                <div className="flex items-center justify-center">
                  <button
                    className="h-12 w-1/3 bg-blue-600 shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    OK
                  </button>
                </div>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </UserLayout>
  );
}
