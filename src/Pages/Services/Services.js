import * as React from "react";
import Header from "../User_Pages/Components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import orders from "../../assets/images/orders.png";
import Footer from "../User_Pages/Components/Footer";
import doctor from "../../assets/images/doctor.png";
import maps from "../../assets/images/maps.jpg";

export default function Services() {
 return (
    <div>
      <Header />

      <div className="relative bg-white overflow-hidden">
        {/* <Header /> */}

        <div className="max-w-7xl mx-auto">
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

            <main className="mx-28">
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
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full z-0"
            src="https://w0.peakpx.com/wallpaper/863/1023/HD-wallpaper-how-we-feel-today-doctor-caine-funny-white-creative-puppy-dog-animal.jpg"
            alt="banner"
          />
        </div>
        <hr />
      </div>

      <div className="w-1/2  h-px bg-black m-auto mt-3"></div>
      <p className="text-4xl p-4 font-bold flex justify-center">
        Services We Provide
      </p>
      <div className="w-1/2  h-px bg-black m-auto mb-3"></div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <a href="viewDoctors">
          <div className="flex">
            <img className="object-contain h-48 w-50 md:h-full md:w-48" src={doctor} alt="View Doctors" />
            <div className="p-8 hover:bg-gray-200">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">View Doctors</h5>
              <p className="mt-2 text-slate-500">View All World Qualified Veterinary Doctors Associated With Us.</p>
            </div>
          </div>
        </a>
      </div>

      <div className="m-5 ml-36">
        <a href="viewDoctors" className="flex flex-col items-center hover:bg-gray-100 bg-white rounded-lg border h-48 shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-contain h-48 w-48 bg-white object-cover rounded-t-lg md:w-48 md:rounded-none md:rounded-l-lg" src={doctor} alt="View Doctors" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">View Doctors</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">View All World Qualified Veterinary Doctors Associated With Us.</p>
          </div>
        </a>
      </div>

      <div className="flex justify-end items-right w-full">
        <div className="m-5 mr-36">
          <a href="#" className="md:max-w-xl flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex flex-col justify-between p-4 leading-normal min-w-[360px]" >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">View Maps</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">View All Clinics in the Vicinity.</p>
            </div>
            <img className="object-cover h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={maps} alt="View Maps" />
          </a>
        </div>
      </div>

      <div className="m-5 ml-36">
        <a href="viewDoctors" className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={doctor} alt="View Doctors" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">Make Appointment</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Make Appointmensts Online With Our Associated Doctors.</p>
          </div>
        </a>
      </div>



      <div className="flex gap-4 mt-12">
        <a href="viewDoctors" target="_blank">
          <Card sx={{ maxWidth: 300, maxHeight: 500, margin: 5 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={orders}
                style={{ width: "250px", padding: "10px" }}
                //image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
                alt="order"
              />
              <hr />
              <CardContent>
                <div
                  style={{
                    alignItem: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  View Doctors
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>

        <div>
          <a href="maps" target="_blank">
            <Card sx={{ maxWidth: 200, maxHeight: "auto" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  width="auto"
                  height="140px"
                  image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
                  alt="order"
                />
                <CardContent>
                  <div
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    View Maps
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </a>
        </div>

        <a href="viewAppointments" target="_blank">
          <Card sx={{ maxWidth: 200, maxHeight: "auto", margin: 5 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width="auto"
                height="140px"
                image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
                alt="order"
              />
              <CardContent>
                <div
                  style={{
                    alignItem: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  View Appointments
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>

        <a href="makeAppointments" target="_blank">
          <Card sx={{ maxWidth: 200, maxHeight: "auto", margin: 5 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width="auto"
                height="140px"
                image="https://firebearstudio.com/blog/wp-content/uploads/2016/11/Mageworx-Magento-2-Extended-Sales-Orders-Grid-Extension.jpg"
                alt="order"
              />
              <CardContent>
                <div
                  style={{
                    alignItem: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  Make Appointments
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </a>
      </div>

      <Footer />
    </div>
  );
}
