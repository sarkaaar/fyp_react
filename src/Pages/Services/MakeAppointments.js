import * as React from "react";
import Header from "../User_Pages/Components/Header";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function MakeAppointments() {

  const [date,setDate] = React.useState();
  const timeSlots = [
    "09:00 AM  -  09:15 AM",
    "09:15 AM  -  09:30 AM",
    "09:30 AM  -  10:00 AM",
    "10:00 AM  -  10:15 AM",
    "10:15 AM  -  10:30 AM",
    "10:30 AM  -  10:45 AM",
    "10:45 AM  -  11:00 AM",
    "11:00 AM  -  11:15 AM",
    "11:15 AM  -  11:30 AM",
    "11:30 AM  -  11:45 AM",
    "11:45 AM  -  12:00 AM",
    "12:00 PM  -  12:15 PM",
    "12:15 PM  -  12:30 PM",
    "12:30 PM  -  12:45 PM",
    "12:45 PM  -  01:00 PM",
    "01:00 PM  -  01:15 PM",
    "01:15 PM  -  01:30 PM",
    "01:30 PM  -  01:45 PM",
    "01:45 PM  -  02:00 PM",
  ];

  return (
    <div>
      <Header />
      {/* <h1>MAke Appointments page is displayed here</h1> */}
      <div style={{ width: "300px", margin: "auto" }}>
        <h1>You are making an appointment with Dr. </h1>

        {/* <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={(e)=>{setDate(e.target.value)}}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="date"
          label="Date"
          type="text"
          id="date"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="date"
          label="Date"
          type="time"
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
