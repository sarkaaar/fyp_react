import React from "react";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";

const Chatbot = () => {
  return (
      
    <Fab
      color="secondary"
      aria-label="add"
      style={{
        position: "fixed",
        bottom: "50%",
        right: "25px",
        zIndex: 1,
        backgroundColor: "#1976d2",
        width: "100px",
        height: "100px",
      }}
    >
      {ChatIcon}
    </Fab>
  );
};
export default Chatbot;
