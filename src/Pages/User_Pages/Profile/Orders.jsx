import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../firebase-config";
import FirebaseDataTable from "../../../components/FirebaseDataTable";
import UserLayout from "../../../layouts/UserLayout";

export default function Cart() {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const ordersRef = collection(db, "checkout");

  const getOrders = async () => {
    const q = await query(ordersRef, where("authUserEamil", "==", user?.email));
    await getDocs(q)
      .then((res) => {
        setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(products);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoader(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getOrders();
  }, [user]);

  // const delay = () => {
  //   setTimeout(() => {
  //     <div>user is not signed in</div>;
  //   }, 5000);
  // };

  return (
    <UserLayout>
      <h1 className="text-2xl p-2 px-8">Orders</h1>
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
                {/* <p> {row.fName}</p>
                <p> {row.lName}</p> */}
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
                <h1>{row.postal}</h1>
              </div>
            ),
          },
          { key: "phone", name: "Phone" },
          {
            key: "description",
            name: "Products",
            render: (row) => (
              <div className="flex flex-col">
                {row.cart.map((prod, key) => (
                  <tr key={key}>
                    <td className="w-12"> {prod?.product?.name}</td>
                    <td className="w-4">{prod?.product?.quantity}</td>
                    <td className="w-6"> {prod?.product?.salePrice}</td>
                  </tr>
                ))}
              </div>
            ),
          },

          {
            key: "action",
            name: "Action",
            render: (row) => (
              <div className="flex flex-col">
                {row.status ? (
                  <h1 className="text-green-600 font-bold w-fit">COMPLETED</h1>
                ) : (
                  <h1 className="text-red-600 font-bold w-fit">PENDING</h1>
                )}
              </div>
            ),
          },
        ]}
      />
    </UserLayout>
  );
}

// {user ? (
//   <>
//     {loader ? (
//       <div className="grid place-items-center w-full h-screen">
//         <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin" />
//       </div>
//     ) : products.length === 0 ? (
//       <div className="font-bold text-center">No orders available! </div>
//     ) : (
//       <table className=" w-11/12 m-auto divide-y bg-white divide-gray-300 table-fixed dark:divide-gray-700">
//         <thead className="p-4 bg-gray-200 dark:bg-gray-700">
//           <tr>
//             <th className="text-xl p-2">Order ID</th>
//             <th className="text-xl p-2">Email</th>
//             <th className="text-xl p-2">Name</th>
//             <th className="text-xl p-2">Address</th>
//             <th className="text-xl p-2">Phone No</th>
//             <th className="text-xl p-2">Products</th>
//             {/* <th className="text-xl p-2">Card</th> */}
//             <th className="text-xl p-2 ">Actions</th>
//           </tr>
//         </thead>

//         {products.map((item, key) => (
//           <tbody key={key}>
//             <tr className="border border-solid border-gray-300">
//               <td className=" text-base 2xl:text-lg p-2 border border-solid border-gray-300">
//                 {item?.id}
//               </td>
//               <td className=" text-base 2xl:text-lg border border-solid border-gray-300 p-2">
//                 {item?.email}
//               </td>
//               <td className=" text-base 2xl:text-lg border border-solid border-gray-300 p-2">
//                 {item?.fName} {item?.lName}
//               </td>
//               <td className=" text-base 2xl:text-lg border border-solid border-gray-300 p-2">
//                 <div className="">
//                   <h1 className="w-48">{item?.address}</h1>
//                   <h1>{item?.city}</h1>
//                   <h1>{item?.postal}</h1>
//                 </div>
//               </td>
//               <td className=" text-base 2xl:text-lg border border-solid border-gray-300 p-2">
//                 {item?.phone}
//               </td>

//               <td className=" text-base 2xl:text-lg border border-solid border-gray-300 p-2">
//                 {item?.cart.map((prod, key) => (
//                   <tr>
//                     <td className="2xl:text-lg border border-solid border-gray-300 p-2">
//                       {prod?.product?.name}
//                     </td>
//                     <td className="2xl:text-lg border border-solid border-gray-300 p-2">
//                       {prod?.product?.quantity}
//                     </td>
//                     <td className="2xl:text-lg border border-solid border-gray-300 p-2">
//                       {prod?.product?.salePrice}
//                     </td>
//                   </tr>
//                 ))}
//               </td>

//               <td className=" text-base 2xl:text-lg border border-solid border-gray-300 p-2">
// {item?.status ? (
//   <h1 className="text-green-600 font-bold w-fit">
//     COMPLETED
//   </h1>
// ) : (
//   <h1 className="text-red-600 font-bold w-fit">
//     PENDING
//   </h1>
// )}
//               </td>
//             </tr>
//           </tbody>
//         ))}
//       </table>
//     )}
//   </>
// ) : (
//   <>{delay}</>
// )}
