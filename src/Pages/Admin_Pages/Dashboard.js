import * as React from "react";
import Header from "../Admin_Pages/admin_components/Header";
import { Button } from "@material-ui/core";
import MiniDrawer from "./admin_components/Sidebar";
import { width } from "@mui/system";
// import  PPpic from "./admin_components/"

export default function Dashboard() {
  
  return (
    <div>
      <Header />
      <div className="flex">
        <div>
          <MiniDrawer />
        </div>
        <div className="w-px h-11/12 bg-black"></div>
        <div className="m-10">
          <div 
            style={{ 
              backgroundImage:
                "url(Pages/Admin_Pages/admin_components/PPpic.jpeg)",
            }}
          ></div>
          <Button className="m-2" variant="contained" disableElevation>
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
    </div>
  );
}
