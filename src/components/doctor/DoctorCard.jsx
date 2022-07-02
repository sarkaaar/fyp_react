import { useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorPic from "../../assets/images/doctor.png";

export default function DoctorCard(person) {
  const [user, setUser] = useState({});

  const [notLogModal, setNotLogModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      // console.log(person.id);
    };
  }, []);

  return (
   
    <div className="m-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md">
       if (user) {
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 w-24 rounded-full pt-2 shadow-lg"
          src={DoctorPic}
          alt="Doctor image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          Dr. {person?.obj.name}
        </h5>
        <span className="text-base text-gray-500">
          Clinic: {person?.obj.clinicName}
        </span>
        <span className="text-base text-gray-500">
          Clinic Address: {person?.obj.clinicAddress}
        </span>
        <span className="text-base text-gray-500">
          Phone No: {person?.obj.clinicPhone}
        </span>
        <span className="text-base font-bold text-gray-500">
          Fee: {person?.obj.fees}
          {" rupees"}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Link
            to={"/maps"}
            state={{
              latitude: person?.obj.latitude,
              longitude: person?.obj.longitude,
              clinicName: person?.obj.clinicName,
            }}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 py-2 px-4 text-center text-sm font-medium text-white shadow-lg shadow-indigo-600/50 transition duration-150 ease-in-out hover:scale-110 hover:bg-blue-800 focus:shadow-none focus:outline-none"
          >
            View on Map
          </Link>
          {/* <a
            href="#"
            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View On Map
          </a> */}
          <a
            href={`/appointments/new/${person?.obj.id}`}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-gray-400 to-gray-900 py-2 px-4 text-center text-sm font-medium text-white shadow-lg shadow-gray-900/50 transition duration-150 ease-in-out hover:scale-110 focus:shadow-none focus:outline-none"
          >
            Book Appointment
          </a>
        </div>
      </div>
    } else setNotLogModal(true);
      <Modal
        open={notLogModal}
        onClose={() => {
          setNotLogModal(false);
          navigate("/sign_in");
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
    </div>
  );
}
