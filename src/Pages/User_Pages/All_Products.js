import * as React from "react";
// import {RangeSlider, Row, Col, InputNumber, InputGroup } from "rsuite";

import MediaCard from "./Components/MediaCard";
import Header from "./Components/Header";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Footer from "./Components/Footer";

export default function Products({ hideLoader }) {
  //  Get Categories Names
  const [value, setValue] = React.useState([10, 50]);

  const [products, setProducts] = useState([]);
  const productsCollection = collection(db, "products");

  useEffect(() => {
    // Search Categories
    const getCategories = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    // Function Calls
    getCategories();
  }, []);

  return (
    <div>
      <Header />

      <div className="flex">
        <div className="w-96 p-16   text-black ">
          <div class="relative inline-block text-left">
            <div>
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <h1 className="font-bold text-3xl">Categories</h1>

                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  {" "}
                  <p className="hover:font-bold">Dog Food</p>
                </a>
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                >
                  {" "}
                  <p className="hover:font-bold">CatFood</p>
                </a>
              </div>
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                >
                  <p className="hover:font-bold">Sparrow Food</p>
                </a>
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                >
                  <p className="hover:font-bold">ParrotFood</p>
                </a>
              </div>
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-4"
                >
                  <p className="hover:font-bold">Toys</p>
                </a>
                <a
                  href="#"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-5"
                >
                  {" "}
                  <p className="hover:font-bold">Accessories</p>
                </a>
              </div>
            </div>
            {/* Price component */}
            <div>
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

                  {/* <Row>
                    <Col md={10}>
                      <RangeSlider
                        progress
                        style={{ marginTop: 16 }}
                        value={value}
                        onChange={(value) => {
                          setValue(value);
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <InputGroup>
                        <InputNumber
                          min={0}
                          max={100}
                          value={value[0]}
                          onChange={(nextValue) => {
                            const [start, end] = value;
                            if (nextValue > end) {
                              return;
                            }
                            setValue([nextValue, end]);
                          }}
                        />
                        <InputGroup.Addon>to</InputGroup.Addon>
                        <InputNumber
                          min={0}
                          max={100}
                          value={value[1]}
                          onChange={(nextValue) => {
                            const [start, end] = value;
                            if (start > nextValue) {
                              return;
                            }
                            setValue([start, nextValue]);
                          }}
                        />
                      </InputGroup>
                    </Col>
                  </Row> */}

                  <p>20000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="xl:flex">
          {products.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((item) => {
                return (
                  <div className="p-2">
                    <MediaCard obj={item} />
                  </div>
                );
              })}
            </div>
          )}
          <div className="w-96 h-full"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
