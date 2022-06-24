/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import { TextField, Modal } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export default function EditProfile({ data }) {
  const [open, setOpen] = useState(false);

  const id = data?.id;
  const email = data?.email;

  const [name, setName] = useState(data?.name);
  const [phone, setPhone] = useState(data?.phone);

  const updateProfile = async (id) => {
    const newProfile = {
      name,
      phone,
    };
    const profile = doc(db, "doctors", id);
    await updateDoc(profile, newProfile).then(() => {
      setOpen(true);
    });
  };

  return (
    <div className="bg-white py-6 px-4 sm:p-6">
      <div className="flex justify-between">
        <div>
          <h2
            id="payment-details-heading"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Update Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            See and update your profile information.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
        />
        <div className="flex gap-4">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            label="Phone Number"
          />
        </div>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          value={email}
          disabled
          fullWidth
          label="Email"
        />
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          value={data?.password}
          type="password"
          disabled
          fullWidth
          label="Password"
        />

        <button
          class="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"

          onClick={() => {
            updateProfile(id);
          }}
        >
          Edit Profile
        </button>
        <h2
          id="payment-details-heading"
          className="text-lg font-medium leading-6 text-red-600"
        >
          For more changes contact admin{" "}
          <h1 className="text-blue-500">ammarzahid335@gmail.com</h1>
        </h2>
      </div>
      <Modal
        open={open}
        onClose={() => {
          window.location.reload(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <h1 className="p-4 text-center text-xl font-bold">
            Edited Successfully
          </h1>
        </div>
      </Modal>
    </div>
  );
}
