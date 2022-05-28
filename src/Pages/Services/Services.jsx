import * as React from "react";
import Footer from "../User_Pages/Components/Footer";
import doctor from "../../assets/images/doctor.png";
import maps from "../../assets/images/maps.jpg";
import mAppointments from "../../assets/images/makeappointments.png";
import UseMainLayout from "../../layouts/UserMainLayout";
import ServicesPagePic from "../../assets/images/services_page.png";


export default function Services() {
  
  return (
    <UseMainLayout>
      <div className="relative pt-36 px-auto bg-white overflow-hidden">
        <div className="max-w-7xl  mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 ,100" />
            </svg>

            <main className="mx-10 md:mx-28">
              {/* <div className="sm:text-center lg:text-left"> */}
              <h1 className="pt-16 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>
                <span className="block text-green-600 xl:inline">
                  Pet-Planet Clinical Services
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Here we provide you with complete solution for the heath care of
                your pets.
              </p>
              {/* </div> */}
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="pl-36 h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full z-0"
            src={ServicesPagePic}
            alt="banner"
          />
        </div>
        <hr />
      </div>

      <div className="w-3/4 md:w-1/2  h-px bg-black m-auto mt-3" />
      <p className="mx-7 text-3xl p-4 font-bold flex justify-center">
        Services We Provide
      </p>
      <div className="w-3/4 md:w-1/2  h-px bg-black m-auto mb-3" />

      <div className="max-w-md mx-auto m-5 bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl 2xl:max-w-4xl">
        <a href="viewDoctors">
          <div className="md:grid md:grid-cols-4">
            <img
              className="object-contain mx-auto h-40 w-50 md:w-48 lg:h-50 lg:w-55 md:col-span-1"
              src={doctor}
              alt="View Doctors"
            />
            <div className="p-8 hover:bg-gray-200 md:col-span-3">
              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-right">
                View Doctors
              </h5>
              <p className="mt-2 text-center text-slate-500 md:text-right">
                View All World Qualified Veterinary Doctors Associated With Us.
              </p>
            </div>
          </div>
        </a>
      </div>

      <div className="max-w-md mx-auto m-5 bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl 2xl:max-w-4xl">
        <a href="maps">
          <div className="md:grid md:grid-cols-4">
            <div className="p-8 hover:bg-gray-200 w-400 md:col-span-3">
              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-left">
                View Maps
              </h5>
              <p className="mt-2 text-center text-slate-500 md:text-left">
                View All Clinics in the Vicinity.
              </p>
            </div>
            <img
              className="object-contain mx-auto h-40 w-50 md:w-48 md:col-span-1"
              src={maps}
              alt="Vew Maps"
            />
          </div>
        </a>
      </div>

      <div className="max-w-md mx-auto m-5 bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl 2xl:max-w-4xl">
        <a href="viewAppointments">
          <div className="md:grid md:grid-cols-4">
            <img
              className="object-contain mx-auto h-40 w-50 md:w-48 lg:h-50 lg:w-55 md:col-span-1"
              src={mAppointments}
              alt="View Doctors"
            />
            <div className="p-8 hover:bg-gray-200 md:col-span-3">
              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-right">
                Book Appointments
              </h5>
              <p className="mt-2 text-center text-slate-500 md:text-right">
                Make Appointmensts Online With Our Associated Doctors.
              </p>
            </div>
          </div>
        </a>

      </div>


      <Footer />
    </UseMainLayout>
  );
}
