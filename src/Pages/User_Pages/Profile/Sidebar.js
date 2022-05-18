import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplayIcon from "@mui/icons-material/Replay";
import ArticleIcon from '@mui/icons-material/Article';

export default function Sidebar() {
  return (
    <aside class="w-64 bg-gray-800 h-full left-0" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-3  rounded ">
        <ul class="space-y-2">
          <li>
            <Link
              to="/profile/favourites"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
            <FavoriteBorderIcon className="w-6 h-6 text-white"/>
              <span class="ml-3 text-white">Favourites</span>
            </Link>
          </li>
          <li>
            
            <Link
              to="/profile/ProductReturns"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >

              <ReplayIcon className="w-6 h-6 text-white "/>
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                Product Return
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/returnProduct"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              {/* <FontAwesomeIcon icon="fa-solid fa-money-check-pen" /> */}
              <ArticleIcon className="w-6 h-6 text-white "/>
              <span class="flex-1 text-white ml-3 whitespace-nowrap">
                Product Return Form
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile/orders"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span class="flex-1 ml-3 text-white whitespace-nowrap">
                Orders
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap text-white">
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
