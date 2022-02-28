import * as React from "react";
import Header from "./admin_components/Header";
import ViewInventoryHead from "./admin_components/viewInventory/viewInventoryHead";
import ViewInventoryBody from "./admin_components/viewInventory/viewInventoryBody";
import Sidebar from "./admin_components/Sidebar";
export default function Inventory() {
  const data = [
    {
      sr: "1",
      name: "dog",
      cost_price: "80",
      sale_price: "100",
      description: "this is a dog",
      stock: "10",
    },
    {
      sr: "2",
      name: "cat",
      cost_price: "80",
      sale_price: "200",
      description: "this is a cat",
      stock: "10",
    },
    {
      sr: "3",
      name: "bird",
      cost_price: "80",
      sale_price: "300",
      description: "this is a bird",
      stock: "10",
    },
  ];

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-72">
        <h1 style={{ marginLeft: "20px" }}>Inventory -{">"}</h1>
      <ViewInventoryHead />

      {data.map((item) => (
        <ViewInventoryBody obj={item} />
      ))}
        </div>
      </div>
    </>
    
  );
}
