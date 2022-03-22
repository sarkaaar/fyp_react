import * as React from "react";
import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { IconButton } from "@mui/material";

export default function Orders() {
  const [products, setProducts] = useState([]);
  const ordersRef = collection(db, "checkout");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(ordersRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, [products]);

  return (
    <>
      <Button
        onClick={() => {
          console.log(products);
        }}
      >
        Click
      </Button>

      <Header />
      <div className="flex">
        <Sidebar />

        <div className="ml-72">
          <h1 className="text-4xl font-bold m-8">Orders -{">"}</h1>
          <table className="  m-fix divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            {/* <ViewInventoryHead /> */}
            <thead className="p-4 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-xl p-2 px-8">Oreder ID</th>
                <th className="text-xl p-2 px-8">Email</th>
                {/* <th className="text-xl p-2 px-8">email</th> */}
                <th className="text-xl p-2 px-8">Name</th>
                <th className="text-xl p-2 px-8">Address</th>
                <th className="text-xl p-2 px-8">City</th>
                <th className="text-xl p-2 px-8">postal</th>
                <th className="text-xl p-2 px-8">phone</th>
                <th className="text-xl p-2 px-8">card</th>
                <th className="text-xl p-2 px-8">NOC</th>
                <th className="text-xl p-2 px-8">expiry</th>
                <th className="text-xl p-2 px-8">cvv</th>
                <th className="text-xl p-2 ">Actions</th>
              </tr>
            </thead>

            {products.map((item, key) => (
              // <ViewInventoryBody obj={item} />
              <>
                <tbody key={key}>
                  <tr>
                    <td className=" text-lg p-2 px-8">{item?.id}</td>
                    {/* <td className=" text-lg p-2 px-8">{item?.authUserEmail}</td> */}
                    <td className=" text-lg p-2 px-8">{item?.email}</td>
                    <td className=" text-lg p-2 px-8">{item?.fName} {item?.lName}</td>
                    <td className=" text-lg p-2 px-8">{item?.address}</td>
                    <td className=" text-lg p-2 px-8">{item?.city}</td>
                    <td className=" text-lg p-2 px-8">{item?.postal}</td>
                    <td className=" text-lg p-2 px-8">{item?.phone}</td>
                    <td className=" text-lg p-2 px-8">{item?.card}</td>
                    <td className=" text-lg p-2 px-8">{item?.NOC}</td>
                    <td className=" text-lg p-2 px-8">{item?.expiry}</td>
                    <td className=" text-lg p-2 px-8">{item?.cvv}</td>
                    {/* <td className=" text-lg p-2 px-8">{item?.products?.map((item.key)=>{return(<></>)})}</td> */}
                    <td className=" text-lg p-2  flex justify-end">
                      <>
                        <Button>
                          <EditIcon />
                        </Button>
                        <Button>
                          <DeleteIcon />
                        </Button>
                      </>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
