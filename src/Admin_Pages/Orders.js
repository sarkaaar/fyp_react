import * as React from "react";
import Header from "./admin_components/Header";

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
      shippingAddress: "Lahore",
      phone: "123",
    },
    {
      username: "name",
      products: [
        { product: "product4" },
        { product: "product5" },
        { product: "product6" },
      ],
      price: [{ price: "12" }, { price: "23" }, { price: "34" }, { price: "54" }, { price: "564" }],
      shippingAddress: "Lahore",
      phone: "123",
    },
  ];

  return (
    <div>
      <Header />
      <h1>this is the Orders page`</h1>
    </div>
  );
}
