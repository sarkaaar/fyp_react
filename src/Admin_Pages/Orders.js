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
<<<<<<< HEAD

=======
>>>>>>> 6ea2696f224156593c3b4b0a3366f32931f75163
    {
      username: "name",
      products: [
        { product: "product4" },
        { product: "product5" },
        { product: "product6" },
      ],
      price: [{ price: "10" }, { price: "20" }, { price: "30" }],
      shippingAddress: "Lahore",
      phone: "0900",
    },
  ];

  return (
    <div>
      <Header />

      <ViewOrdersHead />
      {data.map((item) => (
        <div>
<<<<<<< HEAD
          {/* <Button onClick={()=>{console.log(item)}}>Click</Button> */}
          <ViewOrderBody obj={item} />
        </div>
      ))}
=======
          <ViewOrderBody obj={item} />
          {/* <hr /> */}
        </div>
      ))}
      {/* <h1>this is the Orders page`</h1> */}
      {/* // <Button onClick={()=>{console.log(item)}}>Click me</Button> */}
>>>>>>> 6ea2696f224156593c3b4b0a3366f32931f75163
    </div>
  );
}
