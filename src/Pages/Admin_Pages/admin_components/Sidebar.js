import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";



const drawerWidth = 240;





export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
       
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <a
          href={"/admin/dashboard"}
          className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600"
        >
          DASHBOARD
        </a>
        <Toolbar />
        <Divider />
        <List>
          {/* <ListItemText primary="Hello" />
          <ListItemText primary="World" />
          <ListItemText primary="Saregama" />
          <ListItemText primary="text" /> */}

          <ListItem button >
            <ListItemIcon>
              <InboxIcon />
          
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItem>

          <ListItem button >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
         
          <ListItem button >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Order Queries" />
          </ListItem>

          <ListItem button >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Returns" />
          </ListItem>
          

{/* 
          <ListItem button >
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Order Queries" />
          </ListItem> */}

          {/* {["Email", "Profile", "Order Quries", "Returns"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )} */}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
              
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
