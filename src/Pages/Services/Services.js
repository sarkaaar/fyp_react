import * as React from "react";
import { NavLink } from "react-router-dom";
import Header from "../User_Pages/Components/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import orders from "../../assets/images/orders.png";
import banner from "../../assets/images/banner.jpg";

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
                <span className="block xl:inline">Welcome to the</span>
                <span className="block text-indigo-600 xl:inline">
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

      <div className="w-1/2  h-px bg-black m-auto"></div>
      <p className="text-4xl p-4 font-bold flex justify-center">
        Services we provide
      </p>
      <div className="w-1/2  h-px bg-black m-auto"></div>

      <div className="flex gap-4 mt-12">
        <NavLink to={`/viewDoctors`} activeClassName="active">
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
        </NavLink>

        <div>
          <NavLink to={`/maps`} activeClassName="active">
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
          </NavLink>
        </div>

        <NavLink to={`/viewAppointments`} activeClassName="active">
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
        </NavLink>
        <NavLink to={`/makeAppointments`} activeClassName="active">
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
        </NavLink>
      </div>
    </div>
  );
}
