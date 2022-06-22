import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import MediaCard from "./Components/MediaCard";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import { db } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState();
  const [loader, setLoader] = useState(false);

  const categoriesRef = collection(db, "categories");
  const productsRef = collection(db, "products");

  useEffect(() => {
    setLoader(true);
    const getProducts = async () => {
      await getDocs(productsRef)
        .then((res) => {
          setProduct(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setLoader(false);
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
      <Banner />
      <hr />
      {loader ? (
        <Loader />
      ) : (
        <>
          {categories?.map((item) => (
            <div className="flex justify-center" key={item.id}>
              <div>
                <h1 className="py-4 text-xl font-extrabold">{item?.name}</h1>
                <div className="overflow-x-scroll lg:w-[100rem]">
                  <div className="flex w-fit">
                    {product?.map((product) => (
                      <span key={product.id}>
                        {item?.name === product?.category && (
                          <MediaCard obj={product} key={product} />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <Footer />
    </UseMainLayout>
  );
}
