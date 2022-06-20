/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Button,
  FormControl,
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
// import Loader from "../../components/Loader/Loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase-config";

export default function AddEditProduct({ data }) {
  const [cat, setCat] = useState([]);
  const [loader, setLoader] = useState(false);
  const categoriesCollection = collection(db, "categories");

  const productsCollection = collection(db, "products");
  const [id, setID] = useState(data?.id);
  const [name, setName] = useState(data?.name);
  const [costPrice, setCostPrice] = useState(data?.costPrice);
  const [salePrice, setSalePrice] = useState(data?.salePrice);
  // const z = data?.stock || 0;
  const [stock, setStock] = useState(data?.stock);
  const [category, setCategory] = useState(data?.category);
  const [description, setDescription] = useState(data?.description);
  const [image, setImage] = useState();
  const [urls, setUrls] = useState(data?.urls);
  const [progress, setProgress] = useState();

  const addProduct = async () => {
    const newProduct = {
      name,
      costPrice,
      salePrice,
      stock,
      category,

      description,
      image: urls || "No Image Found",
    };
    console.log(newProduct);
    await addDoc(productsCollection, newProduct);
  };

  // const upload = () => {
  //   console.log("upload images responded");
  //   // console.log(image);
  //   if (!image[0]) return;
  //   const arr = [];

  //   for (let i = 0; i < image.length; i += 1) {
  //     console.log(image);

  //   const storageRef = ref(storage, `products/${image[i].name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, image[i]);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //       setProgress(prog);
  //     },
  //     (error) => console.log(error),
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         console.log(url);
  //         arr.push(url);
  //         setUrls(arr);
  //       });
  //     }
  //   );
  //   }
  // };

  const upload = () => {
    
    if (!image[0]) return;
    const arr = [];
    for (let i = 0; i < image.length; i += 1) {
      const storageRef = ref(storage, `products/${image[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, image[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
          setProgress(prog);
          setLoader(false);
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

  const getCategories = async () => {
    await getDocs(categoriesCollection).then((res) => {
      setCat(res.docs.map((d) => d.data().name));
    });
  };

  useEffect(() => {
    setLoader(true);
    getCategories();
  }, []);

  const updateStock = () => {
    const tempStock = stock;

    setStock();
  };

  const updateProduct = async (id) => {
    const newProduct = {
      name,
      costPrice,
      salePrice,
      stock,
      category,
      description,
      image: urls || "No Image Found",
    };
    console.log(newProduct);
    const prod = doc(db, "products", id);
    await updateDoc(prod, newProduct);
    console.log("Product Updated");
  };

  return (
    <div className="">
      <h1> Product</h1>
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

      <TextField
        margin="normal"
        required
        fullWidth
        type="number"
        label="Stock"
        onChange={(e) => setStock(e.target.value)}
        value={stock}
      />
      {/* 
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
      </Button> */}

      <div>
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
              <MenuItem className="flex flex-row" value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          setLoader(true);
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
      {data ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-6 mb-12"
          onClick={() => {
            updateProduct(id);
          }}
        >
          Update Product
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-6 mb-16"
          onClick={addProduct}
        >
          Add Product
        </Button>
      )}
    </div>
  );
}
