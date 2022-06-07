import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import MediaCard from "./Components/MediaCard";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import { db } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";

export default function HomePage() {
  const categoriesRef = collection(db, "categories");
  const productsRef = collection(db, "products");

  const [product, setProduct] = useState();
  const [categories, setCategories] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getProducts = async () => {
      await getDocs(productsRef)
        .then((res) => {
          setProduct(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoader(false);
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
          setLoader(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoader(false);
    };
    setLoader(true);
    getProducts();
    getCategories();
  }, []);

  return (
    <UseMainLayout>
      {/* <div className="relative  overflow-hidden">
         <div className="pt-24"> */}
      <Banner />
      <hr />
      {loader ? (
        <div className="mt-12 w-full">
          <div className="flex h-full items-center justify-center">
            <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-blue-900" />
          </div>
        </div>
      ) : (
        <>
          {categories?.map((item) => (
            <div className=" m-auto w-fit">
              <h1 className="py-4 text-3xl font-extrabold">{item?.name}</h1>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
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
        </>
      )}
      <Footer />
      {/* </div>
      </div> */}
    </UseMainLayout>
  );
}
