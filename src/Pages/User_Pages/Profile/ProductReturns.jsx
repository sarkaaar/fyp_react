import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase-config";

import FirebaseDataTable from "../../../components/FirebaseDataTable";
import UserLayout from "../../../layouts/UserLayout";
import DataTable from "../../../components/DataTable";

export default function PRoductReturns() {
  const returnRef = collection(db, "productReturn");

  const [user, setUser] = useState();
  const [returns, setreturns] = useState([]);

  const getReturnedItems = async () => {
    const q = await query(returnRef, where("user", "==", user?.email));
    const queryResults = await getDocs(q);
    setreturns(queryResults.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(returns);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getReturnedItems();
  }, [user]);
  return (
    <UserLayout>
      <h1 className="text-2xl p-2 px-8">Returned Products</h1>

      <DataTable
        // query={collection(db, "productReturn")}
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
                {row.date?.toDate()?.toDateString()}
              </div>
            ),
          },
        ]}
      />
    </UserLayout>
  );
}
