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
    await addDoc(product_Return_Collection, newProduct).then(()=>{console.log("product returned sucessfull")})
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="m-auto mt-12 flex flex-col justify-center w-96">
        <h1 className=" text-2xl font-bold flex justify-center">
          Product Return Form
        </h1>
        <div>
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

          <TextareaAutosize
            minRows={10}
            placeholder="  Description*"
            style={{ marginTop: "15px", width: "400px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Click on the "Choose File" button to upload a file:</p>
          <input
            type="file"
            name="file"
            id="file"
            // value={images}
            // onChange={(e) => setImages(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={productReturn}
          >
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  );
}
