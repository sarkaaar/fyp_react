import * as React from "react";
import Header from "../Admin_Pages/admin_components/Header";
import { Button } from "@material-ui/core";
import MiniDrawer from "./admin_components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex">
        <div>
          <MiniDrawer />
        </div>
        {/* <div className="w-px h-11/12 bg-black"></div> */}
        <div className="m-10">
          
          <Button variant="contained">View Profile</Button>
          <Button variant="contained">View Orders</Button>
          <Button variant="contained">View Queries</Button>
        </div>
      </div>
    </>
  );
}
