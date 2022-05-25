/* eslint-disable jsx-a11y/no-redundant-roles */
import { ScaleIcon } from "@heroicons/react/outline";
import { CashIcon, ChevronRightIcon } from "@heroicons/react/solid";
import AdminLayout from "../../layouts/AdminLayout";

import * as React from "react";
import { useState, useEffect } from "react";
// import CheckIcon from "@mui/icons-material/Check";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

import { Button } from "@mui/material";
import { db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";

// import AdminLayout from "../../layouts/AdminLayout";

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

export default function Dashboard() {
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
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Overview
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {/* cars 1 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      "Total Orders"
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {products.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/admin/orders"
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      "Completed Orders"
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {products.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/admin/orders"
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all
                </a>
              </div>
            </div>
          </div>

          {/* card3 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      "Not Completed"
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {products.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/admin/orders"
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Recent activity
      </h2>

      {/* Activity list (smallest breakpoint only) */}
      <FirebaseDataTable
        query={collection(db, "checkout")}
        columns={[
          // { key: "id", name: "Order" },
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
          // {
          //   key: "quantity",
          //   name: "Product Qty",
          //   render: (row) => (
          //     <div className="flex flex-col">
          //       {row.cart.map((prod, key) => (
          //         <tr key={key}>
          //           <td className="w-4">{prod?.quantity}</td>{" "}
          //         </tr>
          //       ))}
          //     </div>
          //   ),
          // },
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
                  <p className="bg-green-100 text-green-800">Completed</p>
                ) : (
                  <p className="bg-yellow-100 text-yellow-800">Not Completed</p>
                )}
              </div>
            ),
          },
        ]}
      />
    </AdminLayout>
  );
}
