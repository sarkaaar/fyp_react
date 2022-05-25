import * as React from "react";
import { useState, useEffect } from "react";
// import CheckIcon from "@mui/icons-material/Check";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import { Button } from "@mui/material";
import { db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";

import AdminLayout from "../../layouts/AdminLayout";
export default function Orders() {
  const [products, setProducts] = useState([]);
  const ordersRef = collection(db, "checkout");

  const getProducts = async () => {
    const data = await getDocs(ordersRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCompleted = async (id) => {
    const prod = doc(db, "checkout", id);
    await updateDoc(prod, { status: true });
    getProducts();
  };
  const handleNotCompleted = async (id) => {
    const prod = doc(db, "checkout", id);
    await updateDoc(prod, { status: false });
    getProducts();
  };

  return (
    <>
      <AdminLayout>
        <h1 className="m-8 text-2xl font-bold">Orders -{">"}</h1>
        <FirebaseDataTable
          query={collection(db, "checkout")}
          columns={[
            { key: "id", name: "Order" },
            { key: "email", name: "Email" },
            {
              key: "description",
              name: "Name",
              render: (row) => (
                <div className="flex flex-col">
                  <p> {row.fName}</p>
                  <p> {row.lName}</p>
                </div>
              ),
            },
            {
              key: "address",
              name: "Address",
              render: (row) => (
                <div className="">
                  <h1 className="w-48">{row.address}</h1>
                  <h1>{row.city}</h1>
                </div>
              ),
            },
            { key: "phone", name: "Phone" },
            {
              key: "quantity",
              name: "Product Qty",
              render: (row) => (
                <div className="flex flex-col">
                  {row.cart.map((prod, key) => (
                    <tr key={key}>
                      <td className="w-4">{prod?.quantity}</td>{" "}
                    </tr>
                  ))}
                </div>
              ),
            },
            {
              key: "description",
              name: "Products",
              render: (row) => (
                <div className="flex flex-col">
                  {row.cart.map((prod, key) => (
                    <tr key={key}>
                      <td className="w-12"> {prod?.product?.name}</td>
                    </tr>
                  ))}
                </div>
              ),
            },
            {
              key: "status",
              name: "Status",
              render: (row) => (
                <div className="flex flex-col">
                  {row.status ? (
                    <Button
                      style={{ color: "green" }}
                      onClick={() => {
                        handleNotCompleted(row.id);
                      }}
                    >
                      Completed
                    </Button>
                  ) : (
                    <Button
                      style={{ color: "red" }}
                      onClick={() => {
                        handleCompleted(row.id);
                      }}
                    >
                      Not Completed
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
        />
      </AdminLayout>
    </>
  );
}
