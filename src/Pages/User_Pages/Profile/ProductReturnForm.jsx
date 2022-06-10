import * as React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { db, auth, storage } from "../../../firebase-config";

import Modal from "@mui/material/Modal";

// import FirebaseDataTable from "../../../components/FirebaseDataTable";
import UserLayout from "../../../layouts/UserLayout";
import { useForm } from "react-hook-form";

export default function ProductReturnForm() {
  const [orderNo, setOrderNo] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductNme] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [urls, setUrls] = useState([]);
  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const [progress, setProgress] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  const upload = () => {
    if (!image[0]) return;
    const arr = [];

    for (let i = 0; i < image.length; i += 1) {
      const storageRef = ref(storage, `returnedProducts/${image[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, image[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            arr.push(url);
            setUrls(arr);
          });
        }
      );
    }
  };

  const productReturnRef = collection(db, "productReturn");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  // Add Products
  const productReturn = async (data) => {
    console.log(data);
    const newProduct = {
      orderNo: data.orderNumber,
      productID: data.productID,
      productName: data.productName,
      issue: data.issue,
      description: data.description,
      images: urls,
      user: user?.email,
      date: new Date(),
    };
    await addDoc(productReturnRef, newProduct).then(() => {
      console.log("product returned sucessfull");
      setModal(true);
    });
  };
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
                  productReturn(data);
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
                      className="w-full mt-6 mb-1 rounded-md border border-solid border-gray-400 focus:border-blue-500"
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
                      className="mt-4 w-full mb-1 rounded-md border border-solid border-gray-400 focus:border-blue-500"
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
                    <h3>
                      Uploaded
                      {progress}
                    </h3>
                    <button
                      type="submit"
                      className="w-full bg-blue-500"
                      onClick={upload}
                    >
                      Upload Image
                    </button>
                    <button type="submit" className="w-full bg-blue-500">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                label="Order #"
                autoFocus
                value={orderNo}
                onChange={(e) => {
                  if (e.target.value.match(/^[A-Za-z0-9 ]+$/))
                    setOrderNo(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Product ID"
                type="text"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Product Name"
                type="text"
                value={productName}
                onChange={(e) => setProductNme(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Issue"
                type="text"
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
              />
            </div>
            <div className="mt-4 w-96">
              <TextareaAutosize
                minRows={4}
                placeholder="  Description*"
                value={description}
                style={{ width: "384px", border: "1px solid gray" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p>
                Click on the &quot;Choose File&quot; button to upload a file:
              </p>

              <input
                type="file"
                className="mb-6"
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                multiple
              />
              <h3>
                Uploaded
                {progress}
              </h3>
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="mt-6 mb-12"
                  onClick={upload}
                >
                  Images Upload
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  onClick={productReturn}
                >
                  Submit Form
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* if doctor is already logged in as a customer */}

      <Modal
        sx={{ mb: 70, ml: "auto", mr: "auto" }}
        open={modal}
        onClose={() => setNoUserOpen(false)}
      >
        <div className="border-box absolute inset-1/2 h-fit w-96 bg-white p-4 drop-shadow-2xl">
          <h1 className="text-2xl font-bold">Product Return Request</h1>
          <h1 className="text-xl">
            The Product Return Request is sucessfully sent
          </h1>

          <Button
            onClick={() => {
              navigate("/profile/ProductReturns");
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </UserLayout>
  );
}
