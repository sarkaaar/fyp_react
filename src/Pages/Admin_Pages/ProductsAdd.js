import * as React from "react";
import { Button, TextField } from "@mui/material";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Header from "./admin_components/Header";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

export default function AddProducts() {
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [variants, setVariants] = useState([["", 0]]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const [progress, setProgress] = useState();
  const [urls, setUrls] = useState([]);

  // Variants Add and Remove
  const updateVariant = (v, i) => {
    const tempVariants = [...variants];
    tempVariants[i] = v;
    setVariants(tempVariants);
  };

  const removeVariant = (i) => {
    variants.splice(i, 1);
    setVariants([...variants]);
  };
  // ---------------------------------------------------------------------------------------------------------------------
  // Firebase

  const productsCollection = collection(db, "products");

  //  Get Categories Names
  const [cat, setCat] = useState([]);
  const categoriesCollection = collection(db, "categories");

  // Get Sub-Categories Names
  const [sub_cat, setSub_Cat] = useState([]);
  const sub_categoriesCollection = collection(db, "sub-categories");

  useEffect(() => {
    // Search Categories
    const getCategories = async () => {
      const data = await getDocs(categoriesCollection);
      setCat(data.docs.map((doc) => doc.data().name));
    };

    // Search Sub-Categories
    const getSub_Categories = async () => {
      const data = await getDocs(sub_categoriesCollection);
      setSub_Cat(data.docs.map((doc) => doc.data().sub_));
    };
    // Function Calls
    getCategories();
    getSub_Categories();
  }, []);

  // Add Products
  const addProduct = async () => {
    const newProduct = {
      name: name,
      costPrice: costPrice,
      salePrice: salePrice,
      variants: variants,
      category: category,
      subCategory: subCategory,
      description: description,
      image: image,
    };
    await addDoc(productsCollection, newProduct);
  };

  const upload = () => {
    if (!image[0]) return;

    for (let i = 0; i < image.length; i++) {
      const storageRef = ref(storage, `products/${image[i].name}`);
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
            // setUrls(urls.push(url));
          });
        }
      );
    }

    // const storageRef = ref(storage, `products/${image.name}`);
    //const uploadTask = uploadBytesResumable(storageRef, image);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    //     setProgress(prog);
    //   },
    //   (error) => console.log(error),
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       console.log(url);
    //     });
    //   }
    // );
  };

  return (
    <div>
      <Header />
      <button
        onClick={() => {
          console.log(urls);
        }}
      >
        CLick Me
      </button>
      <div className="w-96 m-auto mt-6">
        <h1 className="text-center text-3xl">Add a New Product</h1>
        <div className="">
          <TextField
            margin="normal"
            required
            fullWidth
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Cost Price"
            type="text"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Sale Price"
            type="text"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />

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
                onChange={(e) => updateVariant([variant, +e.target.value], i)}
                value={quantity}
              />
              <IconButton type="button" onClick={() => removeVariant(i)}>
                x
              </IconButton>
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

          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              value={category}
              label="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {cat.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
            <Select
              value={subCategory}
              label="category"
              onChange={(e) => {
                setSubCategory(e.target.value);
              }}
            >
              {sub_cat.map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextareaAutosize
            minRows={10}
            placeholder="  Description*"
            className="mt-8 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p>Click on the "Choose File" button to upload a images:</p>
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
          <h3>Uploaded {progress}</h3>
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
        </div>
      </div>
    </div>
  );
}
