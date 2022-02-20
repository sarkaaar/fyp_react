import * as React from "react";
import Header from "../User_Pages/Components/Header";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";

export default function MakeAppointments() {
  const timeSlots = [
    "09:00-09:15",
    "09:15-09:30",
    "09:30-10:00",
    "10:00-10:15",
    "10:15-10:30",
    "10:30-10:45",
    "10:45-11:00",
    "11:00-11:15",
    "11:15-11:30",
    "11:30-11:45",
    "11:45-12:00",
    "12:00-12:15",
    "12:15-12:30",
    "12:30-12:45",
    "12:45-01:00",
    "01:00-01:15",
    "01:15-01:30",
    "01:30-01:45",
    "01:45-02:00",
    
  ];
  return (
    <div>
      <Header />
      {/* <h1>MAke Appointments page is displayed here</h1> */}
      <div style={{ width: "300px", margin: "auto" }}>
        <h1>You are making an appointment with Dr. </h1>

        <TextField
          margin="normal"
          required
          fullWidth
          name="date"
          label="Date"
          type="date"
          id="date"
        />
        <FormControl fullWidth style={{ margin: "10px 0" }}>
          <InputLabel id="demo-simple-select-label">Time Slot</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={doc_Name}
            label="Time Slot"
            onChange={(e) => {
              // setDoc_Name(e.target.value);
            }}
          >
            {timeSlots.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
