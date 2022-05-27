import { MenuAlt1Icon } from "@heroicons/react/outline";
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import GrayLogo from "../assets/images/gray_logo.png";
import c from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export default function UserMainLayout({ children, props }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [dbUser, setDBUser] = useState({});
  const [profileURL, setProfileURL] = useState("");
  const navigate = useNavigate();
  const cartCollection = collection(db, "cart");

  const getCartItems = async () => {
    const q = await query(cartCollection, where("user", "==", user?.email));
    await getDocs(q).then((res) => {
      setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getCartItems();
    getDBUser();

    dbUser.role === "admin"
      ? setProfileURL("/admin/profile")
      : setProfileURL("/profile");
  }, [user]);

  const getDBUser = async () => {
    const q = query(collection(db, "users"), where("email", "==", user?.email));
    await getDocs(q).then((record) => {
      setDBUser(record.docs[0].data());
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <img
                      className="block h-8 w-auto"
                      src={GrayLogo}
                      alt="Pet Planet"
                    />
                  </div>
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                          )
                        }
                      >
                        Home{" "}
                      </NavLink>
                      <NavLink
                        to="/services"
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                          )
                        }
                      >
                        Services
                      </NavLink>
                      <NavLink
                        to="/viewAppointments"
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                          )
                        }
                      >
                        Appointments
                      </NavLink>
                      <NavLink
                        to="/maps"
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                          )
                        }
                      >
                        Maps
                      </NavLink>
                      <NavLink
                        to="/about"
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                          )
                        }
                      >
                        About 
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative pt-12">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon
                          className="mt-12 h-5  w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                        placeholder="Search"
                        type="search"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    {user ? (
                      <>
                        <button
                          type="button"
                          className="flex flex-shrink-0 flex-row rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          onClick={() => {
                            navigate("/cart");
                          }}
                        >
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon
                            className="h-6 w-6 text-gray-300"
                            aria-hidden="true"
                          />
                          {products.length === 0 ? (
                            <span className="hidden" />
                          ) : (
                            <span className="rounded-full bg-indigo-600 p-1 text-sm text-white">
                              {products.length}
                            </span>
                          )}
                        </button>

                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                          <div>
                            <NavLink
                              to={profileURL}
                              className={({ isActive }) =>
                                c(
                                  isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                                )
                              }
                            >
                              Your Profile
                            </NavLink>
                            <NavLink
                              to="/sign_in"
                              onClick={() => {
                                logout();
                              }}
                              className={({ isActive }) =>
                                c(
                                  isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                                )
                              }
                            >
                              Logout
                            </NavLink>
                          </div>
                        </Menu>
                      </>
                    ) : (
                      <NavLink
                        to="/sign_in"
                        className={({ isActive }) =>
                          c(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                          )
                        }
                      >
                        Login
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Disclosure.Button
                  href="/"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  href="/services"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Services
                </Disclosure.Button>
                <Disclosure.Button
                  href="/viewAppointments"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Appointments
                </Disclosure.Button>
                <Disclosure.Button
                  href="/maps"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Maps
                </Disclosure.Button>
              </div>
              {user ? (
                <>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="flex flex-shrink-0 flex-row rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          onClick={() => {
                            navigate("/cart");
                          }}
                        >
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon
                            className="h-6 w-6 text-gray-300"
                            aria-hidden="true"
                          />
                          {products.length === 0 ? (
                            <span className="hidden" />
                          ) : (
                            <span className="rounded-full bg-indigo-600 p-1 text-sm text-white">
                              {products.length}
                            </span>
                          )}
                        </button>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          Cart
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <Disclosure.Button
                        as="a"
                        href={profileURL}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        Your Profile
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="/sign_in"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        <div
                          onClick={() => {
                            logout();
                          }}
                        >
                          Logout
                        </div>
                      </Disclosure.Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Disclosure.Button
                    href="/sign_in"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </Disclosure.Button>
                </>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main className="flex-1">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
