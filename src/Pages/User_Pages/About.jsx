import React from "react";

import Footer from "../User_Pages/Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";
import AboutUsPic from "../../assets/images/about.jpeg";

export default function About() {
  return (
    <div>
      <UseMainLayout>
        <div className="flex flex-col items-center pt-20">
          <img className="" src={AboutUsPic} />
          <div className="">
            <h1 className="pt-8 text-xl font-extrabold text-gray-900 sm:text-2xl md:text-2xl">
              <span className="block xl:inline">Contact At:</span>
              <span className="block pl-4 text-green-600 xl:inline">
                0334044482
              </span>
            </h1>
            <p className="pb-20 text-xl font-extrabold text-gray-900 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Or At:
              <a href="https://mail.google.com/mail/" className="block pl-4 text-green-600 xl:inline underline">
                {" "}
                ammarzahid335@gmail.com
              </a>
            </p>
          </div>
        </div>
      </UseMainLayout>
      <Footer />
    </div>
  );
}
