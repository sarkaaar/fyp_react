import * as React from "react";
import Header from "./admin_components/Header";
import ViewOrderBody from "./admin_components/viewOrders/ViewOrderBody";
import ViewOrdersHead from "./admin_components/viewOrders/ViewOrdersHead";
import Sidebar from "./admin_components/Sidebar";


export default function Orders() {
  const data = [
    {
      username: "name",
      products: [
        { product: "product1" },
        { product: "product2" },
        { product: "product3" },
      ],
      price: [{ price: "12" }, { price: "23" }, { price: "34" }],
      shippingAddress: "Karachi",
      phone: "123",
    },

    {
      username: "name",
      products: [
        { product: "product1" },
        { product: "product2" },
        { product: "product3" },
      ],
      price: [{ price: "12" }, { price: "23" }, { price: "34" }],
      shippingAddress: "Karachi",
      phone: "123",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-72">
          <ViewOrdersHead />
          {data.map((item) => (
            <div>
              <ViewOrderBody obj={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
