import * as React from "react";

export default function ViewInventoryBody(item) {
  return (
    <div className="m-auto p-4 flex justify-between w-11/12">
      <p className="w-1/12">{item.obj.sr}</p>
      <hr />
      <p className="w-1/6">{item.obj.name}</p>
      <hr />
      <p className="w-1/6">{item.obj.cost_price}</p>
      <hr />
      <p className="w-1/6">{item.obj.sale_price}</p>
      <hr />
      <p className="w-2/6">{item.obj.description}</p>
      <hr />
      <p className="w-1/6">{item.obj.stock}</p>
      <hr />
      <p className="w-1/6">CRUD</p>
    </div>
  );
}
