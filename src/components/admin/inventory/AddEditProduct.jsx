/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  // Button,
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
import Loader from "../../../components/Loader/Loader";

export default function AddEditProduct({ data }) {
  const [cat, setCat] = useState([]);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const categoriesCollection = collection(db, "categories");
  const productsCollection = collection(db, "products");

  const [id, setID] = useState(data?.id);
  const [name, setName] = useState(data?.name);
  const [costPrice, setCostPrice] = useState(data?.costPrice);
  const [salePrice, setSalePrice] = useState(data?.salePrice);
  const [stock, setStock] = useState(data?.stock);
  const [category, setCategory] = useState(data?.category);
  const [description, setDescription] = useState(data?.description);
  const [image, setImage] = useState();
  const [urls, setUrls] = useState(data?.urls);
  const [progress, setProgress] = useState();
  const [loadURL, setLoadURL] = useState(false);

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
    if (name && costPrice && salePrice && stock && category && description)
      await addDoc(productsCollection, newProduct).then((res) => {
        setOpen(true);
      });
    else alert("Please fill all the fields");
  };

  const upload = () => {
    if (!image[0]) return;
    const arr = [];
    setLoadURL(true);
    for (let i = 0; i < image.length; i += 1) {
      const storageRef = ref(storage, `products/${image[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, image[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(prog);
          // setLoader(false);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            arr.push(url);
            setUrls(arr);
            setLoadURL(false);
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

  // const updateStock = () => {
  //   const tempStock = stock;

  //   setStock();
  // };

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
    await updateDoc(prod, newProduct).then(()=>{setUpdateOpen(true);});
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
      {!loadURL ? (
        <button
          className=" flex h-12 w-full items-center justify-center rounded-md border bg-indigo-600 py-3 px-8 text-base font-medium text-white "
          type="submit"
          onClick={upload}
        >
          Images Upload
        </button>
      ) : (
        <button
          className=" flex h-12 w-full items-center justify-center rounded-md border bg-indigo-600 py-3 px-8 text-base font-medium text-white "
          disabled
        >
          <div className="flex gap-4">
            <div className="flex">
              <Loader />
            </div>
          </div>
        </button>
      )}
      {urls ? (
        <div className="flex w-96 gap-2">
          {urls.map((item) => {
            return <img src={item} className="h-12 w-12" />;
          })}
        </div>
      ) : (
        <></>
      )}

      {data ? (
        <button
          className=" flex h-12 w-full items-center justify-center rounded-md border bg-indigo-600 py-3 px-8 text-base font-medium text-white "
          type="submit"
          onClick={() => {
            updateProduct(id);
          }}
        >
          Update Product
        </button>
      ) : (
        <button
          className=" mt-8 flex h-12 w-full items-center justify-center rounded-md border bg-indigo-600 py-3 px-8 text-base font-medium text-white "
          type="submit"
          onClick={() => {
            addProduct();
          }}
        >
          Add Product
        </button>
      )}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          window.location.reload(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
            Product Added Successfully
          </h1>
        </div>
      </Modal>
      <Modal
        open={updateOpen}
        onClose={() => {
          setUpdateOpen(false);
          window.location.reload(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
            Product Updated Successfully
          </h1>
        </div>
      </Modal>
    </div>
  );
}
