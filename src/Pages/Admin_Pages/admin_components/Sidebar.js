import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ReplayIcon from "@mui/icons-material/Replay";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CategoryIcon from "@mui/icons-material/Category";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 fixed h-full left-0" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3  rounded ">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard "
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <HomeIcon fontSize="medium" style={{ color: "white" }} />

              <span className="ml-3 text-white">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inventory"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <InventoryIcon classNameName="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3 text-white">Inventory</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/viewAllProducts"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <LocationSearchingIcon classNameName="w-6 h-6 text-white " />
              <span className="flex-1 text-white ml-3 whitespace-nowrap">
                View Products
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addProducts"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <AddShoppingCartIcon classNameName="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3 text-white">Add Product</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <svg
                className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              {/* <ViewInArIcon classNameName="w-6 h-6 text-white " /> */}
              <span className="ml-3 text-white">Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/productReturn"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <ReplayIcon classNameName="w-6 h-6 text-white " />

              <span className="ml-3 text-white">Product Return</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/complaints"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <ContactPhoneIcon classNameName="w-6 h-6 text-white " />
              <span className="ml-3 text-white">Complaints</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <CategoryIcon classNameName="w-6 h-6 text-white " />
              <span className="flex-1 text-white ml-3 whitespace-nowrap">
                Categories
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addDoctor"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <PersonAddIcon classNameName="w-6 h-6 text-white " />
              <span className="flex-1 text-white ml-3 whitespace-nowrap">
                Add Doctor
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/viewDoctor"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <PersonSearchIcon classNameName="w-6 h-6 text-white " />
              <span className="flex-1 text-white ml-3 whitespace-nowrap">
                View Doctor
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <AccountBoxIcon classNameName="w-6 h-6 text-white " />

              <span className="ml-3 text-white">Profile</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/sign_in"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <ExitToAppIcon classNameName="w-6 h-6 text-white "  />
              <span className="flex-1 text-white ml-3 whitespace-nowrap">
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
