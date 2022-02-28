export default function Sidebar() {
  return (
    <div className=" w-72 mt-10 bg-gray-800 absolute inset-y-0 left-0 ">
      <a href="/admin/dashboard ">
        <h1 className=" p-4  text-xl text-white">HOME</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/inventory">
        <h1 className=" p-4  text-xl text-white">INVENTORY</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/addProducts">
        <h1 className=" p-4  text-xl text-white">ADD PRODUCT</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/profile">
        <h1 className=" p-4  text-xl text-white">PROFILE</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/orders">
        <h1 className=" p-4  text-xl text-white">ORDERS</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/productReturn">
        <h1 className=" p-4  text-xl text-white">PRODUCT RETURN</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/complaints">
        <h1 className=" p-4  text-xl text-white">COMPLAINTS</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/categories">
        <h1 className=" p-4  text-xl text-white">CATEGORIES</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/addDoctor">
        <h1 className=" p-4  text-xl text-white">ADD DOCTOR</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/viewDoctor">
        <h1 className=" p-4  text-xl text-white">VIEW DOCTOR</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/viewAllProducts">
        <h1 className=" p-4  text-xl text-white">VIEW PRODUCTS</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/viewAppointments">
        <h1 className=" p-4  text-xl text-white">VIEW APPOINTMENTS</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
      <a href="/admin/reports">
        <h1 className=" p-4  text-xl text-white">REPORTS</h1>
      </a>
      <hr className="w-8/12 m-auto border-gray-500" />
    </div>
  );
}
