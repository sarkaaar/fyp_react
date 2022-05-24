import { useState, useEffect } from "react";
import * as React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function Categories() {
  //  Get Categories Names
  const [cat, setCat] = useState([]);
  const catCollection = collection(db, "categories");

  useEffect(() => {
    // Search Categories
    const getCategories = async () => {
      const data = await getDocs(catCollection);
      setCat(data.docs.map((doc) => doc.data().name));
    };

    // Function Calls
    getCategories();
  }, []);

  return (
    <UseMainLayout>
      <h1>Categories</h1>
      {cat.map((item) => (
        <div className=" m-4 p-2">
          <h1 className="p-12 text-6xl border-2 border-indigo-600 w-96 bg-indigo-300 hover:bg-indigo-400 flex justify-center hover:drop-shadow-xl">
            {item}
          </h1>
        </div>
      ))}
    </UseMainLayout>
  );
}
