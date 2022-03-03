import {Link} from "react-router-dom"

export default function Sidebar() {
  return (
    <div className=" w-72 mt-10 bg-gray-800 absolute inset-y-0 left-0 ">
      <Link to="/admin/dashboard ">
        <h1 className=" p-4  text-xl text-white">HOME</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/inventory">
        <h1 className=" p-4  text-xl text-white">INVENTORY</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/addProducts">
        <h1 className=" p-4  text-xl text-white">ADD PRODUCT</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/profile">
        <h1 className=" p-4  text-xl text-white">PROFILE</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/orders">
        <h1 className=" p-4  text-xl text-white">ORDERS</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/productReturn">
        <h1 className=" p-4  text-xl text-white">PRODUCT RETURN</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/complaints">
        <h1 className=" p-4  text-xl text-white">COMPLAINTS</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/categories">
        <h1 className=" p-4  text-xl text-white">CATEGORIES</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/addDoctor">
        <h1 className=" p-4  text-xl text-white">ADD DOCTOR</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/viewDoctor">
        <h1 className=" p-4  text-xl text-white">VIEW DOCTOR</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/viewAllProducts">
        <h1 className=" p-4  text-xl text-white">VIEW PRODUCTS</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/reports">
        <h1 className=" p-4  text-xl text-white">REPORTS</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/admin/sign_in">
        <h1 className=" p-4  text-xl text-white">LOGOUT</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
    </div>
  );
}
