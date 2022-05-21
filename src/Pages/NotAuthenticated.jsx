import React from "react";
import { Link } from "react-router-dom";
import PageNotFoundPic from "../../src/assets/images/page_not_found_pic.jpg";

export default function NotAuthenticated() {
  return (
    <div className="flex flex-col items-center justify-center font-extrabold text-3xl">
      <h1>You are not Authorised to view this Page!</h1>
      <img className="h-56 m-2" src={PageNotFoundPic} alt="Page Not Found" />
      <h3>Please Login To Continue to view this page</h3>
      <Link
        to="/sign_in"
        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
      >
        Login
      </Link>
    </div>
  );
}
