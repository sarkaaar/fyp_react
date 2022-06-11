import * as React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@material-ui/core/Button";
import MediaCard from "./Components/MediaCard";
import { db } from "../../firebase-config";
import Footer from "./Components/Footer";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function Products() {
  //  Get Categories Names
  const [categories, setCategories] = useState();
  const [currentCategory, setCurrentCategory] = useState("");

  const [products, setProducts] = useState([]);
  const [paginateProducts, setPaginateProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [moreProductLoader, setMoreProductLoader] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loader, setLoader] = useState(false);
  const productsCollection = collection(db, "products");
  const categoriesCollection = collection(db, "categories");

  useEffect(() => {
    // Function Calls
    setLoader(true);
    getProducts();
    getCategories();
    pagination();
  }, []);

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

  const pagination = async () => {
    const first = query(
      collection(db, "products"),
      limit(6),
      orderBy("costPrice", "asc")
    );
    const documentSnapshots = await getDocs(first).then((doc) => {
      const pageData = doc.docs.map((prods) => ({...prods.data(), id: prods.id}));
      const lastVisible = doc.docs[doc.docs.length - 1];

      setPaginateProducts(pageData);
      console.log(paginateProducts);
      setLastDoc(lastVisible);
    });
  };

  const fetchMore = () => {
    setMoreProductLoader(true);
    const next = query(
      collection(db, "products"),
      limit(6),
      orderBy("costPrice", "asc"),
      startAfter(lastDoc)
    );
    const documentSnapshots2 = getDocs(next).then((doc) => {
      const isCollectionEmpty = doc.size === 0;
      if (!isCollectionEmpty) {
        setMoreProductLoader(false);
        const pageData = doc.docs.map((prods) => ({...prods.data(), id: prods.id}));
        const lastVisible = doc.docs[doc.docs.length - 1];

        setPaginateProducts((paginateProducts) => [
          ...paginateProducts,
          ...pageData,
        ]);
        setLastDoc(lastVisible);
        setMoreProductLoader(false);
      } else {
        setIsEmpty(true);
        setMoreProductLoader(false);
      }
    });
  };

  return (
    <UseMainLayout>
      <div>
        <div className="pt-20">
          <h1 className="flex bg-slate-100 pl-96 font-bold">
            Categories <ArrowForwardIcon /> {currentCategory}
          </h1>
          <div className=" flex bg-slate-100">
            <div className="w-96 p-16 text-black ">
              <div className="flex w-56 flex-col items-start rounded-md bg-white shadow-lg ring-1 ">
                <h1 className="block w-full px-4 py-2 text-left text-lg font-bold text-gray-700">
                  Categories
                </h1>
                {categories?.map((item, index) => (
                  <Button
                    key={index}
                    className="w-full px-4 py-2 text-black hover:font-bold"
                    onClick={() => {
                      setCurrentCategory(item.name);
                    }}
                  >
                    {" "}
                    <span className="w-full text-left">{item?.name}</span>
                  </Button>
                ))}
              </div>
              {/* Price component */}
              {/* <div className=" mt-2 w-56 rounded-md shadow-lg bg-white ring-1">
              <p className="text-gray-700 block font-bold px-4 py-2 text-lg">
                Price
              </p>
              <div className="text-gray-700  px-4 py-2 text-sm flex">
                <input
                  placeholder="Min"
                  style={{ width: '60px', height: '30px' }}
                />
                <p className="text-lg text-center pl-4 pr-4 ">-</p>
                <input
                  placeholder="Max"
                  value={value}
                  style={{ width: '60px', height: '30px' }}
                />
              </div>
              <div className="text-gray-700 block px-4 py-2 text-sm">
                <label htmlFor="customRange2" className="form-label">
                  Select Range
                </label>
                <div className="flex">
                  <p>0</p>

                  <input
                    type="range"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />

                  <p>100</p>
                </div>
              </div>
            </div> */}
            </div>

            <hr />

            {loader ? (
              <div className="w-full">
                <div className="flex h-full items-center justify-center">
                  <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
                </div>
              </div>
            ) : products.length === 0 ? (
              <div>No products available!</div>
            ) : currentCategory !== "" ? (
              <div className="xl:flex">
                <div className="grid  lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
                  {paginateProducts.map((item, index) => (
                    <>
                      {currentCategory === item?.category ? (
                        <MediaCard obj={item} />
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </div>
                <div className="h-full w-96" />
              </div>
            ) : (
              <div className="xl:flex">
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
                  {paginateProducts.map((item) => (
                    <div className="p-2">
                      {console.log(item)}
                      <MediaCard obj={item} />
                    </div>
                  ))}
                </div>
                <div className="h-full w-96" />
              </div>
            )}
          </div>
          <div className="h-8 text-center p-56 " />
          {loader ? (
            <></>
          ) : moreProductLoader ? (
            <div className="w-full">
              <div className="flex h-full items-center justify-center">
                <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
              </div>
            </div>
          ) : isEmpty ? (
            <div className="flex justify-center">
              No more products available!
            </div>
          ) : (
            <div className="flex justify-center">
              <button onClick={fetchMore}>Show More</button>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </UseMainLayout>
  );
}
