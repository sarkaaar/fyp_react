import React from "react";
import { Link } from "react-router-dom";
import PageNotFoundPic from "../../src/assets/images/page_not_found_pic.jpg";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center font-extrabold text-3xl">
      {/* <span class="flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
      </span> */}
      <h1>This Page Does not Exists!</h1>
      <img className="h-56 m-2" src={PageNotFoundPic} alt="Page Not Found" />
      <h3>Error 404</h3>
      <Link
        to="/"
        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
