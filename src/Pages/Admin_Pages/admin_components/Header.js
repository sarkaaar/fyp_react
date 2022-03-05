import React from 'react';
import {Link} from "react-router-dom"
export default function Header() {
  return (
    <div>
      <div className="flex p-2 px-8 justify-around">
        <Link
          to={"/admin/dashboard"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          DASHBOARD
        </Link>
        <Link
          to={"/admin/sign_in"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          LOGIN
        </Link>
        <Link
          to={"/admin/inventory"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          INVENTORY
        </Link>
        <Link
          to={"/admin/addProducts"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ADD PRODUCTS
        </Link>
        <Link
          to={"/admin/orders"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ORDERS
        </Link>
        <Link
          to={"/admin/addDoctor"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ADD DOCTORS
        </Link>
        <Link
          to={"/admin/viewDoctor"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          VIEW DOCTORS
        </Link>
        <Link
          to={"/admin/categories"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          CATEGORIES
        </Link>


        <Link
          to={"/admin/viewAllProducts"}
          className="font-medium text-gray-500 hover:text-gray-900"
        >
          ALL PRODUCTS
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>


         </div>
      <hr />
    </div>
  );
}
