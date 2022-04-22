import React from 'react'
import { useState } from "react";
import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";
import { TextField ,Button} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
// import { Button } from 'rsuite';


export default function Complain_Suggestions() {

// const [subject, setSubject] = useState("");
const [description, setDescription] = useState("");


  return (
    <div>
      <Header />

      <div className="flex">
        <Sidebar />

        <div className="m-96"></div>
        <div className="  mt-6">
          <div className="m-auto  align-center ">
            <h1 className="text-center text-3xl">Complaints and Suggestions</h1>
            <div className="w-full">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Subject"
                // value={name}
                // onChange={(e) => setSubject(e.target.value)}
              />
             
              <TextareaAutosize
                minRows={5}
                placeholder="  Description*"
                className="mt-8 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mt-6 mb-12"
                // onClick={addProduct}
                // className="mt-6 mb-12"
              >
                Submit 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
