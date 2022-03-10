import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { db } from "../../../firebase-config";
import { updateDoc, doc } from "firebase/firestore";

export default function CartsCard(obj) {
  const increment = async (id) => {
    const prod = doc(db, "cart", obj?.obj?.id);
    const newProduct = {
      product: {
        quantity: obj?.obj?.product?.quantity + 1,
        name: obj?.obj?.product?.name,
        salePrice: obj?.obj?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
  };

  const decrement = async (id) => {
    const prod = doc(db, "cart", obj?.obj?.id);
    const newProduct = {
      product: {
        quantity: obj?.obj?.product?.quantity - 1,
        name: obj?.obj?.product?.name,
        salePrice: obj?.obj?.product?.salePrice,
      },
    };
    await updateDoc(prod, newProduct);
    console.log("updated");
  };

  // React.useEffect(() => {
  // }, [obj?.obj?.product?.quantity]);

  return (
    <div
      className="flex align-middle justify-between w-11/12"
      style={{ border: "1px solid black" }}
    >
      <h1 className="text-2xl m-2">{obj?.obj?.product?.name}</h1>
      {/* Quantity Picker */}
      <div className="flex m-4 border-box">
        <Button
          className=" w-16 h-12"
          style={{ border: "2px solid gray" }}
          onClick={() => {
            decrement(obj?.obj?.id);
          }}
        >
          <RemoveIcon />
        </Button>
        <div
          className="w-20 h-12"
          style={{ border: "2px solid gray", padding: 5 }}
        >
          <span className="p-2 px-6 text-2xl">
            {obj?.obj?.product?.quantity}
          </span>
        </div>
        <Button
          className="w-16 h-12 m-2"
          style={{ border: "2px solid gray" }}
          onClick={() => {
            increment(obj?.obj?.id);
          }}
        >
          <AddIcon />
        </Button>
      </div>
      <h1>{obj?.obj?.product?.salePrice}</h1>
    </div>
  );
}
