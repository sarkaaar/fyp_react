import { Link } from "react-router-dom";
import DoctorPic from "../../assets/images/doctor.png";
// import Maps from "../../Pages/Services/Maps";

export default function DoctorCard(person) {
  return (
    <div class="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md m-4 w-full">
      <div class="flex flex-col items-center pb-10">
        <img
          class="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={DoctorPic}
          alt="Doctor image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900">
          Dr.{" "}{person?.obj.name}
        </h5>
        <span class="text-base text-gray-500">
          Clinic:{" "}{person?.obj.clinicName}
        </span>
        <span class="text-base text-gray-500">
          Clinic Address:{" "}{person?.obj.clinicAddress}
        </span>
        <span class="text-base text-gray-500">
          Phone No:{" "}{person?.obj.clinicPhone}
        </span>
        <span class="text-base text-gray-500 font-bold">
          Fee:{" "}{person?.obj.fees}{" rupees"}
        </span>
        <div class="mt-4 flex space-x-3 lg:mt-6">
          <Link to={"/maps"} class="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            View on Map
          </Link>
          {/* <a
            href="#"
            class="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View On Map
          </a> */}
          <a
            href={`/appointments/new/${person?.obj.id}`}
            class="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>

    // <div className="bg-white">
    //   <div className="mx-auto py-12 px-4 max-w-7xl h-96 sm:px-6 lg:px-8 lg:py-24">
    //     <div className="space-y-12"></div>
    //     <li key={person.name}>
    //       <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
    //         <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
    //           <img
    //             className="object-cover shadow-lg rounded-lg"
    //             src={DoctorPic}
    //             alt="image"
    //           />
    //         </div>
    //         <div className="sm:col-span-2">
    //           <div className="space-y-4">
    //             <div className="text-lg leading-6 font-medium space-y-1">
    //               <h3>Dr. {" "}{person?.obj.name}</h3>
    //               <p className="text-indigo-600">{person?.obj.fees}</p>
    //             </div>
    //             <div className="text-lg">
    //               <p className="text-gray-500">{person?.obj.clinicName}</p>
    //               <p className="text-gray-500">"{person?.obj.clinicAddress}"</p>
    //               <p className="text-gray-500 italic">
    //                 {person?.obj.clinicPhone}
    //               </p>
    //               <Link to= {`/appointments/new/${person?.obj.id}`}>
    //               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Book Appointment</button>
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
