/* eslint-disable jsx-a11y/no-redundant-roles */
import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  const appointmentsRef = collection(db, "appointments");
  const [appointments, setAppointments] = useState([]);

  const [products, setProducts] = useState([]);
  const ordersRef = collection(db, "checkout");

  const productsCollection = collection(db, "products");
  const [allProducts, setAllProducts] = useState([]);

  const getProducts = async () => {
    const data = await getDocs(ordersRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getAppointments = async () => {
    await getDocs(appointmentsRef)
      .then((res) => {
        setAppointments(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProducts = async () => {
    await getDocs(productsCollection).then((res) => {
      setAllProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getProducts();
    getAppointments();
    getAllProducts();
  }, []);

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
                      "Total appointments"
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {appointments.length}
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
                      "All Products"
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {allProducts.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/admin/inventory"
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

      <FirebaseDataTable
        query={collection(db, "checkout")}
        columns={[
          { key: "email", name: "Email" },
          {
            key: "name",
            name: "Name",
            render: (row) => (
              <>
                {row.fName},{row.lName}
              </>
            ),
          },
          {
            key: "address",
            name: "Address",
            render: (row) => (
              <>
                {row.address},{row.city}
              </>
            ),
          },
          { key: "phone", name: "Phone" },
          {
            key: "products",
            name: "Products",
            render: (row) => (
              <>
                {row.cart.map((prod, key) => (
                  <p className="flex flex-col" key={key}>
                    {prod?.product?.name} * {prod?.product?.quantity} pcs
                  </p>
                ))}
              </>
            ),
          },
          {
            key: "status",
            name: "Status",
            render: (row) => (
              <>
                {row.status ? (
                  <p className="bg-green-100 text-green-800 p-2 rounded-xl text-center">Completed</p>
                ) : (
                  <p className="bg-yellow-100 text-yellow-800 p-2 rounded-xl">Not Completed</p>
                )}
              </>
            ),
          },
        ]}
      />
    </AdminLayout>
  );
}
