import * as React from "react";
import Header from "./admin_components/Header";
import ViewOrderBody from "./admin_components/viewOrders/ViewOrderBody";
import ViewOrdersHead from "./admin_components/viewOrders/ViewOrdersHead";
import { Button } from "@material-ui/core";

export default function Orders() {
<<<<<<< HEAD

  const data = [
    {
      username: "name1",
=======
  const data = [
    {
      username: "name",
>>>>>>> 990e806a4285d9de365e3e7904d97c2fb73ba064
      products: [
        { product: "product1" },
        { product: "product2" },
        { product: "product3" },
      ],
      price: [{ price: "12" }, { price: "23" }, { price: "34" }],
<<<<<<< HEAD
      shippingAddress: "Karachi",
      phone: "123",
    },
    {
      username: "name2",
=======
      shippingAddress: "Lahore",
      phone: "123",
    },
    {
      username: "name",
>>>>>>> 990e806a4285d9de365e3e7904d97c2fb73ba064
      products: [
        { product: "product4" },
        { product: "product5" },
        { product: "product6" },
      ],
<<<<<<< HEAD
      price: [{ price: "10" }, { price: "20" }, { price: "30" }],
      shippingAddress: "Lahore",
      phone: "0900",
    },
  ];
=======
      price: [{ price: "12" }, { price: "23" }, { price: "34" }, { price: "54" }, { price: "564" }],
      shippingAddress: "Lahore",
      phone: "123",
    },
  ];

>>>>>>> 990e806a4285d9de365e3e7904d97c2fb73ba064
  return (
    <div>
      <Header />

      <ViewOrdersHead/>
      {data.map((item) => (<div>
        <ViewOrderBody obj={item} />
        {/* <hr /> */}
      </div>))}
      {/* <h1>this is the Orders page`</h1> */}
      {/* // <Button onClick={()=>{console.log(item)}}>Click me</Button> */}

    </div>
  );
}
