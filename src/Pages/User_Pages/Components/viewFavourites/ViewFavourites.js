import React from "react";
export default function ViewFavourites(item) {
  return (
    <div className="border-2 border-box border-black flex justify-around p-2 m-4">
      <img src={item.obj.photo} className="w-12" />
      <hr />
      <h2>{item.obj.name}</h2>
      <hr />
      <h2>{item.obj.price}</h2>
    </div>
  );
}
