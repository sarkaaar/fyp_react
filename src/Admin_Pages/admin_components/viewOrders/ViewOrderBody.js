import React from "react";
import { Button } from "@material-ui/core";
import { display, flexbox, textAlign } from "@mui/system";
import { CenterFocusStrong } from "@material-ui/icons";

export default function ViewOrderBody(obj) {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: "10px",
        margin: "20px",
        padding: "10px",
        display:'flex',
        justifyContent:"space-around"

      }}
    >
      <p>
        {obj.obj.username}
      </p>
      <p>
      {obj.obj.products.map((item) => (
        <div>
          <p>
         
            {item.product}
          </p>
        </div>
      ))}</p>
      <p >
        {obj.obj.price.map((item) => (
          <div>
            <p>{item.price}</p>
          </div>
        ))}
      </p>

      <p >
        {obj.obj.shippingAddress}
      </p>
      <p >{obj.obj.phone}</p>
    </div>
  );
}

// {
//     username: "name",
//     products: [
//       { product1: "product1" },
//       { product2: "product2" },
//       { product3: "product3" },
//     ],
//     price: [{ price: "12" }, { price2: "23" }, { price3: "34" }],
//     shippingAddress: "Lahore",
//     phone: "123",
//   },
