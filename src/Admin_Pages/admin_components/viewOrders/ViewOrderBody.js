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
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <p>{obj.obj.username}</p>

      <p>
        {obj.obj.products.map((item) => (
          <p>{item.product}</p>
        ))}
      </p>
      <p>
        {obj.obj.price.map((item) => (
          <div>
            <p>{item.price}</p>
          </div>
        ))}
      </p>

      <p>{obj.obj.shippingAddress}</p>
      <p>{obj.obj.phone}</p>
    </div>
  );
}
