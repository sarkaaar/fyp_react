import * as React from "react";

export default function ViewInventoryBody(item) {
  return (
    <div style={{ display: "flex" }}>
      <p
        style={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.sr}
      </p>
      <hr />
      <p
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.name}
      </p>
      <hr />
      <p
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.cost_price}
      </p>
      <hr />
      <p
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.sale_price}
      </p>
      <hr />
      <p
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.description}
      </p>
      <hr />
      <p
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.obj.stock}
      </p>
      <hr />
      <p
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        CRUD
      </p>
    </div>
  );
}
