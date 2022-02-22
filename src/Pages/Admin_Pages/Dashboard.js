import * as React from "react";
import Header from "../Admin_Pages/admin_components/Header";
import { Button } from "@material-ui/core";
import MiniDrawer from "./admin_components/Sidebar";
import { width } from "@mui/system";
// import  PPpic from "./admin_components/"

export default function Dashboard() {
  const list = ["hi", "bye"];
  return (
    <div>
      <Header />
      <MiniDrawer />
      <div style={{ marginLeft: "250px" }}>
        <div style={{backgroundImage: "url(Pages/Admin_Pages/admin_components/PPpic.jpeg)", width:"100px",height:"100px"}}></div>
        <Button variant="contained" disableElevation>
          View Profile
        </Button>
        <Button variant="contained" disableElevation>
          View Orders
        </Button>
        <Button variant="contained" disableElevation>
        View Queries
        </Button>
      
      </div>
    </div>
  );
}
