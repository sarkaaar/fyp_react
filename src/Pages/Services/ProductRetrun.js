import * as React from "react";
import Header from "../User_Pages/Components/Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useState } from "react";
import Sidebar from "../User_Pages/Profile/Sidebar";
import { collection, addDoc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase-config";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export default function ProductReturn() {
  const [orderNo, setOrderNo] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductNme] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [urls, setUrls] = useState([]);

  const [user, setUser] = useState();

  const [progress, setProgress] = useState();

  const upload = () => {
    if (!image) return;

    const storageRef = ref(storage, `returnedProducts/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

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
          setUrls(url);
        });
      }
    );
  };

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
      // images: images,
      // user: user?.email,
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
                className="mb-6"
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                
              />
              <h3>Uploaded {progress}</h3>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={upload}
              >
                Upload
              </Button>
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

// <div>
// <p>Click on the "Choose File" button to upload a images:</p>
// <input
//   type="file"
//   className="mb-6"
//   onChange={(e) => {
//     setImage(e.target.files);
//   }}
//   multiple
// />
// <Button
//   type="submit"
//   fullWidth
//   variant="contained"
//   className="mt-6 mb-12"
//   onClick={upload}
// >
//   Images Upload
// </Button>

// <hr className="mt-6" />
// <Button
//   type="submit"
//   fullWidth
//   variant="contained"
//   className="mt-6 mb-12"
//   onClick={addProduct}
//   // className="mt-6 mb-12"
// >
//   Add Product
// </Button>

// <h3>Uploaded {progress}</h3>
// </div>
