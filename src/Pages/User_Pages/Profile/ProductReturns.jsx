import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase-config";
// import Loader from "../../../components/Loader/Loader";
import UserLayout from "../../../layouts/UserLayout";
import DataTable from "../../../components/DataTable";

export default function ProductReturns() {
  const returnRef = collection(db, "productReturn");

  const [returns, setReturns] = useState([]);

  const getReturnedItems = async (user) => {
    const q = query(
      returnRef,
      orderBy("time", "desc"),
      where("user", "==", user?.email)
    );
    await getDocs(q).then((res) => {
      setReturns(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      getReturnedItems(currentUser);
    });
  }, []);
  return (
    <UserLayout>
      <h1 className="p-2 px-8 text-2xl">Returned Products</h1>

      <DataTable
        data={returns}
        columns={[
          { key: "productID", name: "Product ID" },
          { key: "productName", name: "Name" },
          { key: "orderNo", name: "Order No." },
          { key: "description", name: "Description" },
          { key: "issue", name: "Issue" },
          {
            key: "date",
            name: "Date",
            render: (row) => (
              <div className="flex flex-col">
                {row.time?.toDate()?.toDateString()}
              </div>
            ),
          },
        ]}
      />
    </UserLayout>
  );
}
