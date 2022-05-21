import * as React from 'react';
import { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
  collection, getDocs, updateDoc, doc,
} from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../../firebase-config';
import Sidebar from './admin_components/Sidebar';
import Header from './admin_components/Header';

export default function Orders() {
  const [products, setProducts] = useState([]);
  const ordersRef = collection(db, 'checkout');

  const getProducts = async () => {
    const data = await getDocs(ordersRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCompleted = async (id) => {
    const prod = doc(db, 'checkout', id);
    await updateDoc(prod, { status: true });
    getProducts();
  };
  const handleNotCompleted = async (id) => {
    const prod = doc(db, 'checkout', id);
    await updateDoc(prod, { status: false });
    getProducts();
  };

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />

        <div className="ml-72">
          <h1 className="text-4xl font-bold m-8">
            Orders -
            {'>'}
          </h1>
          <table className="  m-fix divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            <thead className="p-4 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-xl p-2 px-8">Oreder ID</th>
                <th className="text-xl p-2 px-8">Email</th>
                <th className="text-xl p-2 px-8">Name</th>
                <th className="text-xl p-2 px-8">Address</th>
                <th className="text-xl p-2 px-8">phone</th>
                <th className="text-xl p-2 px-8">Products</th>
                <th className="text-xl p-2 px-8">card</th>
                {/* <th className="text-xl p-2 px-8">NOC</th> */}
                <th className="text-xl p-2 ">Actions</th>
              </tr>
            </thead>

            {products.map((item, key) => (
              <tbody key={key}>
                <tr>
                  <td className=" text-lg p-2 px-8">{item?.id}</td>
                  <td className=" text-lg p-2 px-8">{item?.email}</td>
                  <td className=" text-lg p-2 px-8">
                    {item?.fName}
                    {' '}
                    {item?.lName}
                  </td>
                  <td className=" text-lg p-2 px-8">
                    <div className="">
                      <h1 className="w-48">{item?.address}</h1>
                      <h1>{item?.city}</h1>
                      <h1>{item?.postal}</h1>
                    </div>
                  </td>
                  <td className=" text-lg p-2 px-8">{item?.phone}</td>

                  <td className=" text-lg p-2 px-8">
                    {item?.cart.map((prod, key) => (
                      <tr>
                        <td className="px-4">{prod?.product?.name}</td>
                        <td className="px-4">
                          {prod?.product?.quantity}
                        </td>
                        <td className="px-4">
                          {prod?.product?.salePrice}
                        </td>
                      </tr>
                    ))}
                  </td>
                  <td className=" text-lg p-2 px-8">
                    <h1>{item?.NOC}</h1>
                    <h1 className="text-gray-500">{item?.card}</h1>
                  </td>
                  {/* <td className=" text-lg p-2 px-8">{item?.NOC}</td> */}
                  <td className=" text-lg p-2">
                    {item?.status ? (
                      <Button
                        style={{ color: 'green' }}
                        onClick={() => {
                          handleNotCompleted(item.id);
                        }}
                      >
                        <CheckIcon />
                      </Button>
                    ) : (
                      <Button
                        style={{ color: 'red' }}
                        onClick={() => {
                          handleCompleted(item.id);
                        }}
                      >
                        <CheckIcon />
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
