import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import MediaCard from "./Components/MediaCard";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import { db } from "../../firebase-config";
import UseMainLayout from "../../layouts/UserMainLayout";

import { motion } from "framer-motion";

export default function HomePage() {
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState();
  const [loader, setLoader] = useState(false);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  // useEffect(() => {
  //   console.log(carousel.current);
  //   if (product) {
  //     setWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
  //     console.log(
  //       carousel?.current?.scrollWidth - carousel?.current?.offsetWidth
  //     );
  //   }
  // },[product]);

  const categoriesRef = collection(db, "categories");
  const productsRef = collection(db, "products");

  useEffect(() => {
    setLoader(true);
    const getProducts = async () => {
      await getDocs(productsRef)
        .then((res) => {
          // setWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);

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
              <div className="">
                <motion.div
                  ref={carousel}
                  className="carousel"
                  style={{
                    cursor: "grab",
                    // overflow: "hidden",
                    // width:"100rem"
                  }}
                >
                  <motion.div
                    drag="x"
                    whileDrag={"grabbing"}
                    dragConstraints={{ right: 0, left: -width }}
                    className="lg:w-[100rem] overflow-x-scroll flex gap-4"
                  >
                    {product?.map((product) => (
                      <motion.div key={product} >
                        {item?.name === product?.category ? (
                          <MediaCard obj={product} />
                        ) : (
                          <div />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          ))}
        </>
      )}
      <Footer />
    </UseMainLayout>
  );
}
