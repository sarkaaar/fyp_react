import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className=" w-72 mt-10 bg-gray-800 absolute inset-y-0 left-0 ">
      <Link to="/profile">
        <h1 className=" p-4  text-xl text-white">PROFILE</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/profile/orders">
        <h1 className=" p-4  text-xl text-white">ORDERS</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/profile/productReturn">
        <h1 className=" p-4  text-xl text-white">PRODUCT RETURN</h1>
      </Link>
      <hr className="w-8/12 m-auto border-gray-500" />
      <Link to="/profile/favourites">
        <h1 className=" p-4  text-xl text-white">FAVOURITES</h1>
      </Link>
    </div>
  );
}
