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
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase-config";

export default function AddEditProduct({ data }) {
  const [cat, setCat] = useState([]);
  const categoriesCollection = collection(db, "categories");

  // Get Sub-Categories Names
  const [subCat, setSubCat] = useState([]);
  const subCatRef = collection(db, "sub-categories");
  const productsCollection = collection(db, "products");
  const [name, setName] = useState(data?.name);
  const [costPrice, setCostPrice] = useState(data?.costPrice);
  const [salePrice, setSalePrice] = useState(data?.salePrice);
  const [variants, setVariants] = useState(Object.values(data?.variants ?? {}).length ? Object.values(data?.variants) : [['', 0]]);
  const [category, setCategory] = useState(data?.category);
  const [subCategory, setSubCategory] = useState(data?.subCategory);
  const [description, setDescription] = useState(data?.description);
  const [image, setImage] = useState(data?.image);
  const [urls, setUrls] = useState(data?.urls);
  const [progress, setProgress] = useState();

  // Add Products
  const addProduct = async () => {
    const x = variants.reduce((acc, val, i) => ({ ...acc, [i]: val }), {});

    const newProduct = {
      name,
      costPrice,
      salePrice,
      variants: x,
      category,
      subCategory,
      description,
      image: urls || "No Image Found",
    };
    console.log(newProduct);
    await addDoc(productsCollection, newProduct);
  };

  const upload = () => {
    if (!image[0]) return;
    const arr = [];

    for (let i = 0; i < image.length; i = +1) {
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
            arr.push(url);
            setUrls(arr);
          });
        },
      );
    }
  };

  // Search Categories
  const getCategories = async () => {
    await getDocs(categoriesCollection).then((res) => {
      setCat(res.docs.map((d) => d.data().name));
    });
  };

  // Search Sub-Categories
  const getSubCategories = async () => {
    await getDocs(subCatRef)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        setSubCat(res.docs.map((d) => d.data().sub_));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Function Calls
    getCategories();
    getSubCategories();
  }, []);

  const removeVariant = (i) => {
    variants.splice(i, 1);
    setVariants([...variants]);
  };

  const updateVariant = (v, i) => {
    const tempVariants = [...variants];
    tempVariants[i] = v;
    setVariants(tempVariants);
  };

  const updateProduct = async (id) => {
    const prod = doc(db, "products", id);
    await updateDoc(prod, { capital: true });
    console.log("Product Updated");
  };

  return (
    <div className="absolute inset-1/2 w-96 h-fit border-box bg-white drop-shadow-2xl p-4 -translate-x-1/2 -translate-y-1/2">
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
}
