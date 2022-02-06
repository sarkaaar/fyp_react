import * as React from "react";

export default function ViewInventoryHead() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2 style={{ width: "10%", display: "flex", justifyContent: "center" }}>
          Sr.
        </h2>
        <hr />
        <h2 style={{ width: "20%", display: "flex", justifyContent: "center" }}>
          Name
        </h2>
        <hr />
        <h2 style={{ width: "20%", display: "flex", justifyContent: "center" }}>
          Cost Price
        </h2>
        <hr />
        <h2 style={{ width: "20%", display: "flex", justifyContent: "center" }}>
          Sale Price
        </h2>
        <hr />
        <h2 style={{ width: "20%", display: "flex", justifyContent: "center" }}>
          Description
        </h2>
        <hr />
        <h2 style={{ width: "20%", display: "flex", justifyContent: "center" }}>
          Stock
        </h2>
        <hr />
        <h2 style={{ width: "20%", display: "flex", justifyContent: "center" }}>
          Actions
        </h2>
      </div>
      <hr style={{ width: "90%" }} />
    </div>
  );
}
