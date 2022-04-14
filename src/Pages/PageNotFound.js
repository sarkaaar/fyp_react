import React from "react";

export default function PageNotFound() {
  return (
    <div className="  pl-96 pt-44 font-extrabold text-3xl">
      <span class="flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
      </span>
      <h1>404</h1>
      <h2>Error Page Not Found</h2>
      <a
        href="viewDoctors"
        className="w-full flex   items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
      >
        View Store
      </a>
    </div>
  );
}
