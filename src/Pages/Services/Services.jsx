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
      <div className="px-auto relative overflow-hidden bg-white pt-36">
        <div className="mx-auto  max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 ,100" />
            </svg>

            <main className="mx-10 md:mx-28">
              <h1 className="pt-16 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to</span>
                <span className="block text-green-600 xl:inline">
                  Pet-Planet Clinical Services
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Here we provide you with complete solution for the heath care of
                your pets.
              </p>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="z-0 h-56 w-full object-cover pl-36 sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={ServicesPagePic}
            alt="banner"
          />
        </div>
        <hr />
      </div>

      <div className="m-auto mt-3  h-px w-3/4 bg-black md:w-1/2" />
      <p className="mx-7 flex justify-center p-4 text-3xl font-bold">
        Services We Provide
      </p>
      <div className="m-auto mb-3  h-px w-3/4 bg-black md:w-1/2" />

      <div className="m-5 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-lg md:max-w-2xl 2xl:max-w-4xl">
        <a href="viewDoctors">
          <div className="md:grid md:grid-cols-4">
            <img
              className="w-50 lg:h-50 lg:w-55 mx-auto h-40 object-contain md:col-span-1 md:w-48"
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

      <div className="m-5 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-lg md:max-w-2xl 2xl:max-w-4xl">
        <a href="maps">
          <div className="md:grid md:grid-cols-4">
            <div className="w-400 p-8 hover:bg-gray-200 md:col-span-3">
              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-left">
                View Maps
              </h5>
              <p className="mt-2 text-center text-slate-500 md:text-left">
                View All Clinics in the Vicinity.
              </p>
            </div>
            <img
              className="w-50 mx-auto h-40 object-contain md:col-span-1 md:w-48"
              src={maps}
              alt="Vew Maps"
            />
          </div>
        </a>
      </div>

      <div className="m-5 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-lg md:max-w-2xl 2xl:max-w-4xl">
        <a href="viewAppointments">
          <div className="md:grid md:grid-cols-4">
            <img
              className="w-50 lg:h-50 lg:w-55 mx-auto h-40 object-contain md:col-span-1 md:w-48"
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
