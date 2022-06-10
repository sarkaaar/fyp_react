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
  const productReturn = async () => {
    const newProduct = {
      orderNo,
      productID,
      productName,
      issue,
      description,
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
      <div className="flex justify-center ">
        <div className=" flex flex-col justify-center p-8 bg-white rounded-lg">
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
            <div className="w-96 mt-4">
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
              </div>
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
