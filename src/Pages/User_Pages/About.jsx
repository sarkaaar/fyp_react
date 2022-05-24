import React from 'react';

import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
export default function About() {
  return (
    <div> 
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
                <span className="block xl:inline">Contact</span>
                <span className="block text-green-600 xl:inline">
                0334044482
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                <a href='https://mail.google.com/mail/'> ammarzahid335@gmail.com</a>
              </p>
              {/* </div> */}
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="pl-36 h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full z-0"
            src="https://w0.peakpx.com/wallpaper/863/1023/HD-wallpaper-how-we-feel-today-doctor-caine-funny-white-creative-puppy-dog-animal.jpg"
            alt="banner"
          />
        </div>
        </div>
</UseMainLayout>
    <Footer />
    </div>
  )
}
