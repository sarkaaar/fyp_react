import * as React from "react";
import Header from "../User_Pages/Components/Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useState } from "react";
import Sidebar from "../User_Pages/Profile/Sidebar";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function ProductReturn() {
  const [orderNo, setOrderNo] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductNme] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  const [user, setUser] = useState();

  const product_Return_Collection = collection(db, "productReturn");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);
  // Add Products
  const productReturn = async () => {
    const newProduct = {
      orderNo: orderNo,
      productID: productID,
      productName: productName,
      issue: issue,
      description: description,
      images: images,
      user: user?.email,
      date: new Date(),
    };
    await addDoc(product_Return_Collection, newProduct).then(() => {
      console.log("product returned sucessfull");
    });
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="flex justify-center pt-32 bg-gray-100">
        <div className="p-8 ml-64 flex flex-col justify-center  bg-white rounded-lg">
          <h1 className=" text-2xl font-bold flex justify-center">
            Product Return Form
          </h1>
          <div className="flex gap-4">
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Order #"
                autoFocus
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
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
            <div className="w-96 mt-4">
              <TextareaAutosize
                minRows={9}
                placeholder="  Description*"
                value={description}
                style={{ width: "384px", border: "1px solid gray" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p>Click on the "Choose File" button to upload a file:</p>
              <input
                type="file"
                name="file"
                id="file"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={productReturn}
              >
                Submit Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
