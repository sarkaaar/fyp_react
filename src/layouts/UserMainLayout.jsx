import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import GrayLogo from "../assets/images/gray_logo.png";
import c from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {
  MenuIcon,
  ShoppingCartIcon,
  LogoutIcon,
  HomeIcon,
  XIcon,
  InformationCircleIcon,
  AdjustmentsIcon,
  CalendarIcon,
  MapIcon,
  LoginIcon,
} from "@heroicons/react/outline";

export default function UserMainLayout({ children, props }) {
  const [docCount, setDocCount] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const fuseRef = useRef(null);
  const navigate = useNavigate();
  const cartCollection = collection(db, "cart");
  const doctorsRef = collection(db, "doctors");

  const getCartItems = async (user) => {
    const q = await query(cartCollection, where("user", "==", user.email));
    await getDocs(q).then((res) => {
      setCartItems(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const showDoctorHeader = async (user) => {
    //   1- Fetch for the record in Doctor's Table
    const q = query(doctorsRef, where("email", "==", user.email));
    await getDocs(q)
      .then(async (res) => {
        setDocCount(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  const getProducts = async () => {
    await getDocs(collection(db, "products")).then((res) => {
      setProducts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const getDBUser = async (user) => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const record = await getDocs(q);
    setUserProfile(record.docs[0].data());
  };

  useEffect(() => {
    console.log("dummy value changes " + props);
  }, [props]);

  useEffect(() => {
    if (!products) return;

    fuseRef.current = new Fuse(products, {
      threshold: 0.3,
      keys: ["name", "description"],
    });
  }, [products]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        getProducts();
        if (!user) {
          setUser(null);
          return;
        }
        setUser(user);
        console.log("user logged in", user);
        getCartItems(user);
        getDBUser(user);
        showDoctorHeader(user);
      }),
    []
  );

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
                        onChange={(e) => {
                          if (!fuseRef.current) return;
                          setSearchResults(
                            fuseRef.current.search(e.target.value)
                          );
                        }}
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
                        <NavLink
                          className="flex flex-shrink-0 flex-row rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          to="/cart"
                        >
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon
                            className="h-6 w-6 text-gray-300"
                            aria-hidden="true"
                          />
                          {cartItems.length === 0 ? (
                            <span className="hidden" />
                          ) : (
                            <span className="rounded-full bg-indigo-600 p-1 text-sm text-white">
                              {cartItems.length}
                            </span>
                          )}
                        </NavLink>

                        <Menu as="div" className="relative  ml-4 flex-shrink-0">
                          <div className="inline-flex">
                            <NavLink
                              to={
                                userProfile?.role === "admin"
                                  ? "/admin/profile"
                                  : "/profile/favourites"
                              }
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
                            {docCount?.length != 0 ? (
                              <NavLink
                                to="/doctor/dashboard"
                                className={({ isActive }) =>
                                  c(
                                    isActive
                                      ? "bg-gray-900 text-white"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                    "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white"
                                  )
                                }
                              >
                                Doctor View
                              </NavLink>
                            ) : (
                              <div></div>
                            )}

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
                {/* <Disclosure.Button className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white"> */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    c(
                      isActive
                        ? "w-full bg-gray-900 text-white"
                        : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                      "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    )
                  }
                >
                  <HomeIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  Home
                </NavLink>
                {/* </Disclosure.Button> */}
                {/* <Disclosure.Button
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white"
                > */}
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    c(
                      isActive
                        ? "w-full bg-gray-900 text-white"
                        : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                      "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    )
                  }
                >
                  <AdjustmentsIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  Services
                </NavLink>
                {/* </Disclosure.Button> */}
                {/* <Disclosure.Button
                  href="/viewAppointments"
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                > */}
                <NavLink
                  to="/viewAppointments"
                  className={({ isActive }) =>
                    c(
                      isActive
                        ? "w-full bg-gray-900 text-white"
                        : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                      "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    )
                  }
                >
                  <CalendarIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  Appointments
                </NavLink>
                {/* </Disclosure.Button> */}
                {/* <Disclosure.Button
                  href="/maps"
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                > */}
                <NavLink
                  to="/maps"
                  className={({ isActive }) =>
                    c(
                      isActive
                        ? "w-full bg-gray-900 text-white"
                        : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                      "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    )
                  }
                >
                  <MapIcon
                    className="mr-4 h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                  Maps
                </NavLink>
                <hr />
                {/* </Disclosure.Button> */}
                {user ? (
                  <>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        c(
                          isActive
                            ? "w-full bg-gray-900 text-white"
                            : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                          "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        )
                      }
                    >
                      <ShoppingCartIcon
                        className="mr-4 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      Cart
                      {cartItems.length === 0 ? (
                        <span className="hidden" />
                      ) : (
                        <div className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm text-white">
                          {cartItems.length}
                        </div>
                        // <span className="rounded-full bg-indigo-600 h-6 w-6 text-center text-sm text-white">
                        //   {cartItems.length}
                        // </span>
                      )}
                    </NavLink>
                    <NavLink
                      to={
                        userProfile?.role === "admin"
                          ? "/admin/profile"
                          : "/profile"
                      }
                      className={({ isActive }) =>
                        c(
                          isActive
                            ? "w-full bg-gray-900 text-white"
                            : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                          "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        )
                      }
                    >
                      <InformationCircleIcon
                        className="mr-4 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      Your Profile
                    </NavLink>
                    <NavLink
                      to="/sign_in"
                      onClick={logout}
                      className={({ isActive }) =>
                        c(
                          isActive
                            ? "w-full bg-gray-900 text-white"
                            : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                          "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        )
                      }
                    >
                      <LogoutIcon
                        className="mr-4 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/sign_in"
                      className={({ isActive }) =>
                        c(
                          isActive
                            ? "w-full bg-gray-900 text-white"
                            : "w-full text-gray-300 hover:bg-gray-700 hover:text-white",
                          "flex h-14 w-full items-center rounded-md px-2 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        )
                      }
                    >
                      <LoginIcon
                        className="mr-4 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      Login
                    </NavLink>
                  </>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main className="flex-1">
        {searchResults.length ? (
          <ul>
            {searchResults.map((prod) => (
              <li key={prod.item.id}>
                {prod.item.name} ({prod.item.salePrice})
              </li>
            ))}
          </ul>
        ) : (
          <div className="">{children}</div>
        )}
      </main>
    </div>
  );
}
