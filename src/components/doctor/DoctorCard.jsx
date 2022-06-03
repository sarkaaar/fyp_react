import { useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorPic from "../../assets/images/doctor.png";
import Maps from "../../Pages/Services/Maps";

export default function DoctorCard(person) {
  useEffect(() => {
    return () => {
      // console.log(person.id);
    };
  }, []);

  return (
    <div className="m-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md">
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
            className="inline-flex transition duration-150 ease-in-out hover:scale-110 items-center rounded-lg shadow-indigo-600/50 shadow-lg bg-gradient-to-r from-indigo-600 to-blue-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:shadow-none"
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
            className="inline-flex transition duration-150 ease-in-out hover:scale-110 items-center rounded-lg shadow-gray-900/50 shadow-lg bg-gradient-to-r from-gray-400 to-gray-900 py-2 px-4 text-center text-sm font-medium text-white focus:outline-none focus:shadow-none"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>

    // <div classNameName="bg-white">
    //   <div classNameName="mx-auto py-12 px-4 max-w-7xl h-96 sm:px-6 lg:px-8 lg:py-24">
    //     <div classNameName="space-y-12"></div>
    //     <li key={person.name}>
    //       <div classNameName="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
    //         <div classNameName="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
    //           <img
    //             classNameName="object-cover shadow-lg rounded-lg"
    //             src={DoctorPic}
    //             alt="image"
    //           />
    //         </div>
    //         <div classNameName="sm:col-span-2">
    //           <div classNameName="space-y-4">
    //             <div classNameName="text-lg leading-6 font-medium space-y-1">
    //               <h3>Dr. {" "}{person?.obj.name}</h3>
    //               <p classNameName="text-indigo-600">{person?.obj.fees}</p>
    //             </div>
    //             <div classNameName="text-lg">
    //               <p classNameName="text-gray-500">{person?.obj.clinicName}</p>
    //               <p classNameName="text-gray-500">"{person?.obj.clinicAddress}"</p>
    //               <p classNameName="text-gray-500 italic">
    //                 {person?.obj.clinicPhone}
    //               </p>
    //               <Link to= {`/appointments/new/${person?.obj.id}`}>
    //               <button classNameName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Book Appointment</button>
    //            </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* <button onClick={()=>{console.log(person.obj.name)}}>click</button> */}
    //     </li>
    //   </div>
    // </div>
  );
}
