import Header from "./Components/Header";
import MediaCard from "./Components/MediaCard";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage() {
  const categoriesRef = collection(db, "categories");
  const productsRef = collection(db, "products");

  const [product, setProduct] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    const getProducts = async () => {
      await getDocs(productsRef)
        .then((res) => {
          setProduct(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCategories = async () => {
      await getDocs(categoriesRef)
        .then((res) => {
          setCategories(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      <Header />
      <Banner />
      <hr />
      <div className="bg-slate-100">
      {categories?.map((item) => (
        <div className=" w-fit m-auto">
          <h1 className="text-3xl p-12 font-extrabold">{item?.name}</h1>
          <div className="   grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {product?.map((product) => (
              <>
                {item?.name === product?.category ? (
                  <MediaCard obj={product} />
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        </div>
      ))}
</div>
      <Footer />
    </div>
  );
}
