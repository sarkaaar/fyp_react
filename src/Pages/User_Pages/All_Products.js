import * as React from "react";
import MediaCard from "./Components/MediaCard";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";

export default function Products() {
  //  Get Categories Names
  const [value, setValue] = React.useState([10, 50]);
  const [categories, setCategories] = useState();

  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const productsCollection = collection(db, "products");
  const categoriesCollection = collection(db, "categories");

  useEffect(() => {
    // Search Categories
    const getProducts = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoader(false);
    };
    const getCategories = async () => {
      const data = await getDocs(categoriesCollection);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoader(false);
    };
    // Function Calls
    setLoader(true);
    getProducts();
    getCategories();
  }, []);

  return (
    <div>
      <Header />

      <div className="flex bg-slate-100">
        <div className="w-96 p-16 text-black ">
          <div class="relative inline-block text-left">
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <h1 className="text-gray-700 block font-bold px-4 py-2 text-lg">
                  Categories
                </h1>
                {categories?.map((item, key) => {
                  return (
                    <>
                      <Link
                        to={`/${item?.name}`}
                        class="text-gray-700 block px-4 py-2 text-sm"
                      >
                        <p className="hover:font-bold">{item?.name}</p>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
            {/* Price component */}
            <div className=" bg-white w-56">
              <p className="font-bold text-2xl pt-72">Price</p>
              <div className="flex py-0.5">
                <input
                  placeholder="Min"
                  style={{ width: "60px", height: "30px" }}
                />
                <p className="text-lg text-center pl-4 pr-4 ">-</p>
                <input
                  placeholder="Max"
                  style={{ width: "60px", height: "30px" }}
                />
              </div>
              <div class="relative pt-1">
                <label for="customRange2" class="form-label">
                  Example range
                </label>
                <div className="flex">
                  <p>300</p>

                  <input type="range" />

                  <p>20000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {loader ? (
          <div className="w-full">
            <div className="flex justify-center items-center h-full">
              <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div>No products available!</div>
        ) : (
          <div className="xl:flex">
            <div className="grid  lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
              {products.map((item) => {
                return (
                  <div className="p-2">
                    <MediaCard obj={item} />
                  </div>
                );
              })}
            </div>
            <div className="w-96 h-full"></div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
