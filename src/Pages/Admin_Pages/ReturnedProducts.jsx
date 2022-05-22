import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './admin_components/Header';
import Sidebar from './admin_components/Sidebar';
import { db, auth } from '../../firebase-config';

import FirebaseDataTable from "../../components/FirebaseDataTable";

import AdminLayout from "../../layouts/AdminLayout";
export default function ReturnedProducts() {
  const productReturn = collection(db, 'productReturn');

  const [user, setUser] = useState();
  const [returns, setreturns] = useState([]);

  const getReturnedItems = async () => {
    await getDocs(productReturn)
      .then((res) => {
        setreturns(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getReturnedItems();
  }, [user]);

  return (
    <>
      <AdminLayout>
      <h1 className="text-2xl p-2 px-8 font-bold">Returned Products</h1>
       
        <FirebaseDataTable
        query={collection(db, "productReturn")}
        columns={[
          { key: "productName", name: "Name" },
          { key: "orderNo", name: "Order#" },
          { key: "date", name: "Return Date", render: (r) => r.date.toDate().toDateString() },
          { key: "issue", name: "Issue" },
          {key:"productID",name:"Product Id"}

        ]}
        />
      </AdminLayout>
    </>
  );
}

        {/* <table className=" w-11/12 m-auto divide-y bg-white divide-gray-300 table-fixed dark:divide-gray-700">
          <thead className="p-4 bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="text-xl p-2 px-8">Name</th>
              <th className="text-xl p-2 px-8">Order # </th>
              <th className="text-xl p-2 px-8">Product Id</th>
              <th className="text-xl p-2 px-8">Description</th>
              <th className="text-xl p-2 px-8">Issue</th>
              <th className="text-xl p-2 ">Date</th>
            </tr>
          </thead>
          {returns.map((item, key) => (
            <tbody key={key}>
              <tr className="">
                <td className="text-center text-lg p-2 px-8">
                  {item?.productName}
                </td>
                <td className=" text-center text-lg p-2 px-8">
                  {item?.orderNo}
                </td>
                <td className=" text-center text-lg p-2 px-8">
                  {item?.productID}
                </td>
                <td className=" text-center text-lg p-2 px-8">
                  {item?.description}
                </td>
                <td className=" text-center text-lg p-2 px-8">
                  {item?.issue}
                </td>
                <td className=" text-center text-lg p-2 px-8">
                  {item?.date?.toDate()?.toDateString()}
                </td>
              </tr>
            </tbody>
          ))}
        </table> */}
     