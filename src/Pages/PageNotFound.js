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
        href="/"
        className="inline flex px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
      > 
        Go to HomePage
      </a>
    </div>
  );
}
