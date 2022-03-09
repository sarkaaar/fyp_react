import * as React from "react";
import { useState, useEffect } from "react";
import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";
import { db } from "../../firebase-config";
import EditIcon from "@mui/icons-material/Edit";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function ViewDoctor() {
  //  Get Categories Names
  const [doctors, setDoctors] = useState([]);
  const doctorsCollection = collection(db, "doctors");

  const getDoctors = async () => {
    const data = await getDocs(doctorsCollection);
    setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("Doctoers Recieved");
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const disableDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, { status: false });
    console.log("Doctor Disabled ");
    getDoctors();
  };
  const enableDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, { status: true });
    console.log("Doctor Enabled ", id);
    getDoctors();
  };

  const updateDoctor = async (id) => {
    const prod = doc(db, "doctors", id);
    await updateDoc(prod, sDoctor);
    console.log("Doctor Updated ", id);
    console.log(prod);
    getDoctors();
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [sDoctor, setSDoctor] = useState({});

  return (
    <>
      <Header />
      <div className="">
        <Sidebar />

        <div className="ml-72">
          <h1 className="text-3xl font-bold m-12">List Of Doctors</h1>
          <table className="m-auto divide-y divide-gray-200 table-fixed dark:divide-gray-700">
            {/* <ViewInventoryHead /> */}
            <thead className="p-4 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-lg p-2 mx-4">Name</th>
                <th className="text-lg p-2 mx-4">Email</th>
                <th className="text-lg p-2 mx-4">DOB</th>
                <th className="text-lg p-2 mx-4">CNIC</th>
                <th className="text-lg p-2 mx-4">Phone</th>
                <th className="text-lg p-2 mx-4">Clinic Name</th>
                <th className="text-lg p-2 mx-4">Clinic Adress</th>
                <th className="text-lg p-2 mx-4">Clinic Phone</th>
                <th className="text-lg p-2 mx-4">Fees</th>
                <th className="text-lg p-2 mx-4">Commision</th>
                <th className="text-lg p-2 ">Actions</th>
              </tr>
            </thead>

            {doctors.map((item, key) => (
              // <ViewInventoryBody obj={item} />
              <React.Fragment key={key}>
                <tbody>
                  <tr>
                    <td className="text-lg p-2 mx-4">{item.name}</td>
                    <td className="text-lg p-2 mx-4">{item.email}</td>
                    <td className="text-lg p-2 mx-4">{item.dob}</td>
                    <td className="text-lg p-2 mx-4">{item.cnic}</td>
                    <td className="text-lg p-2 mx-4">{item.phone}</td>
                    <td className="text-lg p-2 mx-4">{item.clinicName}</td>
                    <td className="text-lg p-2 mx-4">{item.clinicAddress}</td>
                    <td className="text-lg p-2 mx-4">{item.clinicPhone}</td>
                    <td className="text-lg p-2 mx-4">{item.fees}</td>
                    <td className="text-lg p-2 mx-4">{item.commision}</td>
                    <td className=" p-2  flex justify-end">
                      <>
                        <Button
                          onClick={() => {
                            setSDoctor(item);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </Button>
                        {/* <h1>{item.status}</> */}
                        {item.status ? (
                          <Button
                            onClick={() => {
                              disableDoctor(item.id);
                            }}
                          >
                            <CheckIcon style={{ color: "green" }} />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              enableDoctor(item.id);
                            }}
                          >
                            <CheckIcon style={{ color: "red" }} />
                          </Button>
                        )}
                      </>
                    </td>
                  </tr>
                </tbody>
              </React.Fragment>
            ))}
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="absolute inset-1/2	w-fit h-fit border-box bg-white drop-shadow-2xl	p-4"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 id="modal-modal-title" className="mt-2 text-xl">
            Update Doctor
          </h1>
          <div className="flex gap-4">
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Doctor Name"
                value={sDoctor?.name}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoFocus
                value={sDoctor?.email}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="DOB"
                type="date"
                value={sDoctor?.dob}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="CNIC"
                type="text"
                value={sDoctor?.cnic}
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone No."
                type="text"
                autoComplete="current-password"
                value={sDoctor?.phone}
                onChange={(e) =>
                  setSDoctor({ ...sDoctor, phone: e.target.value })
                }
              />
            </div>
            <div className="w-96">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Name"
                type="text"
                value={sDoctor?.clinicName}
                onChange={(e) =>
                  setSDoctor({ ...sDoctor, clinicName: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Address"
                type="text"
                value={sDoctor?.clinicAddress}
                onChange={(e) =>
                  setSDoctor({ ...sDoctor, clinicaddress: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Clinic Phone"
                type="text"
                value={sDoctor?.clinicPhone}
                onChange={(e) =>
                  setSDoctor({ ...sDoctor, clinicPhone: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Fees"
                type="text"
                value={sDoctor?.fees}
                onChange={(e) =>
                  setSDoctor({ ...sDoctor, fees: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Commision"
                type="number"
                value={sDoctor?.commision}
                onChange={(e) =>
                  setSDoctor({ ...sDoctor, commision: e.target.value })
                }
              />

              <div className="flex gap-4 w-96">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Latitude"
                  type="number"
                  value={sDoctor?.latitude}
                  onChange={(e) =>
                    setSDoctor({ latitide: e.target.value, ...sDoctor })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Longitude"
                  type="number"
                  value={sDoctor?.longitude}
                  onChange={(e) =>
                    setSDoctor({ longitude: e.target.value, ...sDoctor })
                  }
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    console.log(sDoctor);
                  }}
                >
                  Click
                </Button>
              </div>
            </div>
          </div>
          <div className=" flex gap-4">
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                updateDoctor(sDoctor?.id);
              }}
            >
              Yes
            </Button>
            <Button onClick={handleClose} fullWidth variant="contained">
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
