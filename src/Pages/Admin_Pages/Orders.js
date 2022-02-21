import * as React from "react";
import Header from "./admin_components/Header";
import ViewOrderBody from "./admin_components/viewOrders/ViewOrderBody";
import ViewOrdersHead from "./admin_components/viewOrders/ViewOrdersHead";
import { Button } from "@material-ui/core";

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
    <div>
      <Header />

      <ViewOrdersHead />
      {data.map((item) => (
        <div>
          {/* <Button onClick={()=>{console.log(item)}}>Click</Button> */}
          <ViewOrderBody obj={item} />
        </div>
      ))}
    </div>
  );
}
