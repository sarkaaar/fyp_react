import c from "classnames";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  UserGroupIcon,
  XIcon,
  AcademicCapIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import useUserRole from "../hooks/useUserRole";
import GrayLogo from "../assets/images/gray_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { act } from "@testing-library/react";
import Button from '@mui/material/Button';

const navigation = [
  {
    name: "Home",
    href: "/admin/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Inventory",
    href: "/admin/inventory",
    icon: ClockIcon,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ScaleIcon,
  },
  {
    name: "Product Return",
    href: "/admin/productReturn",
    icon: CreditCardIcon,
  },
  {
    name: "Complaints",
    href: "/admin/complaints",
    icon: UserGroupIcon,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: DocumentReportIcon,
  },
  {
    name: "Doctors",
    href: "/admin/viewDoctor",
    icon: AcademicCapIcon,
  },
  {
    name: "Add Doctor",
    href: "/admin/addDoctor",
    icon: UserAddIcon,
  },
  {
    name: "Users",
    href: "/admin/users/info",
    icon: UserAddIcon,
  },
];

const logout = async () => {
  await signOut(auth).then((e) => {
    navigate("/");
  });
};
// const secondaryNavigation = [
//   { name: "Profile", href: "/admin/profile", icon: QuestionMarkCircleIcon },
//   { name: "Logout", href: "/sign_in", icon: CogIcon },
// ];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authState = useUserRole("admin");
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === "error") {
      navigate("/sign_in");
    }
  }, [authState]);

  return (
    <div className="min-h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 px-0 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src={GrayLogo} />
                </div>
                <p className="px-2 text-lg text-white font-bold">Pet Planet</p>

                <nav
                  className="mt-5 flex-shrink-0 h-full divide-y divide-gray-900 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white hover:bg-gray-700",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                      <NavLink
                        to="/admin/profile"
                        // onClick={logout}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <QuestionMarkCircleIcon
                          className="mr-4 h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        Profile
                      </NavLink>
                      <Button
                        // to="/admin/profile"
                        onClick={logout}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <CogIcon
                          className="mr-4 h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        Logout
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow bg-gray-800 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-8 w-auto" src={GrayLogo} />
            <p className="px-2 text-lg text-white font-bold">Pet Planet</p>
          </div>
          <nav
            className="mt-5 flex-1 flex flex-col divide-y divide-gray-900 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    c(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-700",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="px-2 space-y-1">
                {/* {secondaryNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-400 hover:text-white hover:bg-indigo-600"
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))} */}
                <NavLink
                  to="/admin/profile"
                  // onClick={logout}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <QuestionMarkCircleIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  Profile
                </NavLink>
                <Button
                  // to="/admin/profile"
                  onClick={logout}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <CogIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  Logout
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex" />
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
