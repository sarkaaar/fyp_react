import * as React from "react";
import MediaCard from "./Components/MediaCard";
import Header from "./Components/Header";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Button from "@mui/material/Button";

export default function Products() {
  //  Get Categories Names
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

      <div style={{ display: "flex" }}>
        {/* Search Filters */}

        <div style={{ minWidth: "30%", padding: "25px" }}>
          <p>
            <Checkbox value="remember" color="primary" placeholder="Hi" />
            Remember Me
          </p>
          <div class=" flex justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>

          <h1> Categories</h1>
          <p style={{ fontSize: "x-large" }}>Dog Food</p>
          <p style={{ fontSize: "x-large" }}>CatFood</p>
          <p style={{ fontSize: "x-large" }}>Sparrow Food</p>
          <p style={{ fontSize: "x-large" }}>ParrotFood</p>
          <p style={{ fontSize: "x-large" }}>Toys</p>
          <p style={{ fontSize: "x-large" }}>Accessories</p>
          {/* Price component */}
          <div>
            <p style={{ fontWeight: "bold", fontSize: "x-large" }}>Price</p>
            <div style={{ display: "flex" }}>
              <input
                placeholder="Min"
                style={{ width: "100px", height: "30px" }}
              />
              <p
                style={{
                  fontSize: "large",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                -
              </p>
              <input
                placeholder="Max"
                style={{ width: "100px", height: "30px" }}
              />
            </div>
          </div>
        </div>

        <hr />

        {/* Products Section */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {products.map((item) => {
            return (
              <div className="p-2">
                <MediaCard obj={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
