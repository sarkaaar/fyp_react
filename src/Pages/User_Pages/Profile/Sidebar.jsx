import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplayIcon from "@mui/icons-material/Replay";
import ArticleIcon from "@mui/icons-material/Article";

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 bottom-0 h-full w-64 bg-gray-800"
      aria-label="Sidebar"
    >
      <div className=" mt-24 rounded  py-4 px-3">
        <ul className="space-y-2">
          <li>
            <Link
              to="/profile/favourites"
              class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-600  dark:text-white dark:hover:bg-gray-700"
            >
              <FavoriteBorderIcon className="h-6 w-6 text-white" />
              <span className="ml-3 text-white">Favourites</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile/ProductReturns"
              class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-600  dark:text-white dark:hover:bg-gray-700"
            >
              <ReplayIcon className="h-6 w-6 text-white " />
              <span className="ml-3 flex-1 whitespace-nowrap text-white">
                Product Return
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/returnProduct"
              class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-600  dark:text-white dark:hover:bg-gray-700"
            >
              <ArticleIcon className="h-6 w-6 text-white " />
              <span className="ml-3 flex-1 whitespace-nowrap text-white">
                Product Return Form
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile/orders"
              class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-600  dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap text-white">
                Orders
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              class="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-600  dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap text-white">
                Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
