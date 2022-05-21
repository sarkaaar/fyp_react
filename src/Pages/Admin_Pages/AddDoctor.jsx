import * as React from 'react';
import { Button, TextField } from '@mui/material';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import Header from './admin_components/Header';
import { db } from '../../firebase-config';
import Sidebar from './admin_components/Sidebar';

export default function AddDoctor() {
  const doctorsCollection = collection(db, 'doctors');
  const availabilityRef = collection(db, 'available_days');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [cnic, setCNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicPhone, setClinicPhone] = useState('');
  const [fees, setFees] = useState('');
  const [commision, setCommision] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const addDoctor = async () => {
    const newDoctor = {
      name,
      email,
      dob,
      cnic,
      phone,
      clinicAddress,
      clinicName,
      clinicPhone,
      fees,
      commision,
      description,
      latitude,
      longitude,
    };
    // -------------------------------------------------------
    const days = {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    };
    await addDoc(doctorsCollection, newDoctor).then(async (res) => {
      console.log(res);
      await addDoc(availabilityRef, { doc_id: res.id, days }).then((res) => {
        console.log(res);
        console.log('added');
        // await addDoc(availabilityRef, { doc_id: res.id, days })
      });
    });

    console.log('Doctor Added');
  };
  // -------------------------------------------------------

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-72" />
        <div className="m-auto mt-12 align-center ">
          <h1 className="text-4xl flex justify-center px-10">
            Add a New Doctor
          </h1>

          <div className="flex gap-4">
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Doctor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="DOB"
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="CNIC"
                type="text"
                value={cnic}
                onChange={(e) => setCNIC(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone No."
                type="text"
                autoComplete="current-password"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Name"
                type="text"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Address"
                type="text"
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Phone"
                type="text"
                value={clinicPhone}
                onChange={(e) => setClinicPhone(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Fees"
                type="text"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Commision"
                type="number"
                value={commision}
                onChange={(e) => setCommision(e.target.value)}
              />

              <div className="flex gap-4 w-96">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Latitude"
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Longitude"
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="border-2 border-box">
            <TextareaAutosize
              margin="normal"
              required
              minRows={10}
              placeholder="  Description*"
              className="mt-8 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={addDoctor}
          >
            Add Doctor
          </Button>
        </div>
      </div>
    </div>
  );
}
