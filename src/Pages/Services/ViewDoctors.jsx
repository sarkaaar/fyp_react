import * as React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import DoctorCard from "../../components/doctor/DoctorCard";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate , Link} from "react-router-dom";


export default function ViewDoctors() {
  const [user, setUser] = useState({});
  const [notLogModal, setNotLogModal] = useState(false);
  const [doctors, setDoctor] = useState([]);
  const doctorsCollection = collection(db, "doctors");
  const navigate = useNavigate();
  const getDoctor = async () => {
    const q = query(doctorsCollection, where("status", "==", false));

    if (user) {
      await getDocs(q).then((res) => {
        setDoctor(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    } else setNotLogModal(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    getDoctor();
  }, []);

  return (
    <UseMainLayout>
      <div className="pt-8">
        {doctors.length === 0 && (
          <div className="grid h-screen place-items-center">
            <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
          </div>
        )}
        <div className="flex w-full items-center justify-center sm:flex-row">
          <div className="flex w-full shrink-0 flex-wrap items-center justify-center">
            {doctors.map((item, index) => (
              <DoctorCard key={index} obj={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        open={notLogModal}
        onClose={() => {
          setNotLogModal(false);
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg ">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <hr className="my-2 bg-black " />
          <h1 className="mb-2 text-center text-lg font-bold">Warning!</h1>
          <h1 className="mb-4 text-center text-lg font-bold">
            You are not logged in. Please login to continue.
          </h1>
          <div className="flex items-center justify-center">
            <Link
              to="/sign_in"
              className="flex h-12 w-1/3 items-center justify-center rounded-md bg-blue-600 text-white shadow-md shadow-slate-400 hover:bg-blue-700 hover:drop-shadow-lg focus:shadow-none"
              onClick={() => {
                setNotLogModal(false);
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </Modal>
    </UseMainLayout>
  );
}
