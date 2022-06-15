import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase-config";
// import FirebaseDataTable from "../../../components/FirebaseDataTable";
import DataTable from "../../../components/DataTable";
import UserLayout from "../../../layouts/UserLayout";

export default function Cart() {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  // const [loader, setLoader] = useState(false);
  // const ordersRef = collection(db, "checkout");

  const getOrders = async (user) => {
    const q = query(
      collection(db, "checkout"),
      where("authUserEamil", "==", user?.email)
    );
    await getDocs(q)
      .then((res) => {
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // console.log(products);
      })
      .catch((e) => {
        console.log(e);
      });
    // setLoader(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getOrders(currentUser);
    });
  }, [user]);

  return (
    <UserLayout>
      <h1 className="p-2 px-8 text-2xl">Orders</h1>
      <DataTable
        data={products}
        loading={!products}
        columns={[
          { key: "id", name: "Order" },
          { key: "email", name: "Email" },
          {
            key: "Name",
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
              <>
                <h1 className="w-48">{row.address}</h1>
                <h1>{row.city}</h1>
                <h1>{row.postal}</h1>
              </>
            ),
          },
          { key: "phone", name: "Phone" },
          {
            key: "Products",
            name: "Products",
            render: (row) => (
              <>
                {row.cart.map((prod, key) => (
                  <tr key={key}>
                    <td className="w-12 p-2"> {prod?.product?.name}</td>
                    <td className="w-4 p-2">{prod?.product?.quantity}</td>
                    <td className="w-6 p-2"> {prod?.product?.salePrice}</td>
                  </tr>
                ))}
              </>
            ),
          },

          {
            key: "action",
            name: "Action",
            render: (row) => (
              <div className="flex flex-col">
                {row.status ? (
                  <h1 className="w-fit font-bold text-green-600">COMPLETED</h1>
                ) : (
                  <h1 className="w-fit font-bold text-red-600">PENDING</h1>
                )}
              </div>
            ),
          },
        ]}
      />
    </UserLayout>
  );
}
