import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ReplayIcon from "@mui/icons-material/Replay";
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CategoryIcon from '@mui/icons-material/Category';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
export default function Sidebar() {
 

  return (
    <aside class="w-64 bg-gray-800 fixed h-full left-0" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-3  rounded ">
        <ul class="space-y-2">
          <li>
            <Link
              to="/admin/dashboard "
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <HomeIcon fontSize="medium" style={{ color: "white" }} />

              <span class="ml-3 text-white">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inventory"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <InventoryIcon className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3 text-white">Inventory</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/viewAllProducts"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
            <LocationSearchingIcon className="w-6 h-6 text-white "/>
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                VIEW PRODUCTS
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addProducts"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <AddShoppingCartIcon className="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span class="ml-3 text-white">Add Product</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/admin/orders"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <ViewInArIcon className="w-6 h-6 text-white " />
              <span class="ml-3 text-white">ORDERS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/productReturn"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <ReplayIcon  className="w-6 h-6 text-white "/>

              <span class="ml-3 text-white">PRODUCT RETURN</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/complaints"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              
              <ContactPhoneIcon className="w-6 h-6 text-white "/>
              <span class="ml-3 text-white">COMPLAINTS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
             <CategoryIcon  className="w-6 h-6 text-white " />
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                CATEGORIES
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/addDoctor"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
            <PersonAddIcon className="w-6 h-6 text-white " />
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                ADD DOCTOR
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/viewDoctor"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
             <PersonSearchIcon className="w-6 h-6 text-white "/>
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                VIEW DOCTOR
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <AccountBoxIcon className="w-6 h-6 text-white " />
              
              <span class="ml-3 text-white">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <AccountBoxIcon className="w-6 h-6 text-white " />
              
              <span class="ml-3 text-white">Complaints</span>
            </Link>
          </li>
         
          <li>
            <Link
              to="/admin/sign_in"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                LOGOUT
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
