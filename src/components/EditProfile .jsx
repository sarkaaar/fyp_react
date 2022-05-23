/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase-config";

export default function EditProfile({ data }) {
  const usersCollection = collection(db, "users");

  // Get Sub-Categories Names

  const [user, setUser] = useState();
  const [name, setName] = useState(data?.name);
  const [phone, setPhone] = useState(data?.Phone);
  const [password, setPassword] = useState(data?.password);

  // Add Products
  const editPofile = async () => {
    const newProfile = {
      name,

      password,
      phone,
    };
    console.log(newProduct);
    const prod = doc(db, "users", id);
    await updateDoc(prod, newProfile);
    console.log("Profile Updated");
  };
}

const getProfile = async () => {
  const q = await query(ordersRef, where("authUserEamil", "==", user?.email));
  await getDocs(q)
    .then((res) => {
      setProfile(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(profile);
    })
    .catch((e) => {
      console.log(e);
    });

  useEffect(() => {
    getProfile();

    () =>
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  }, []);

  // Search Categories

  return (
    <div className="border-box absolute inset-1/2 h-fit w-96 -translate-x-1/2 -translate-y-1/2 bg-white p-4 drop-shadow-2xl">
      <Button />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex gap-4 ">
        <div className="w-96">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Cost Price"
            type="text"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
        </div>
        <div className="w-96">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Sale Price"
            type="text"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>
      </div>

      {variants?.map(([variant, quantity], i) => (
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
            onChange={(e) => updateVariant([variant, +e.target.value], i)}
            value={quantity}
          />
          <IconButton type="button" onClick={() => removeVariant(i)}>
            x
          </IconButton>
          <button
            onClick={() => {
              console.log();
            }}
          >
            oclick
          </button>
        </div>
      ))}
      <Button
        sx={{ marginTop: "10px", marginBottom: "10px" }}
        type="button"
        fullWidth
        variant="outlined"
        onClick={() => setVariants([...variants, ["", 0]])}
      >
        Add variant
      </Button>
      <div className="flex gap-4 ">
        <div className="w-96">
          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              value={category}
              label="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {cat.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-96">
          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
            <Select
              value={subCategory}
              label="category"
              onChange={(e) => {
                setSubCategory(e.target.value);
              }}
            >
              {subCat.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <TextareaAutosize
        minRows={5}
        placeholder="  Description*"
        className="mt-8 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>Click on the &quot;Choose File&quot; button to upload a images:</p>
      <input
        type="file"
        className="mb-6"
        onChange={(e) => {
          setImage(e.target.files);
        }}
        multiple
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="mt-6 mb-12"
        onClick={upload}
      >
        Images Upload
      </Button>
      <h3>
        Uploaded
        {progress}
      </h3>
      <hr className="mt-6" />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="mt-6 mb-12"
        onClick={addProduct}
        // className="mt-6 mb-12"
      >
        Add Product
      </Button>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="mt-6 mb-12"
        onClick={updateProduct}
        // className="mt-6 mb-12"
      >
        Update Product
      </Button>
    </div>
  );
};
