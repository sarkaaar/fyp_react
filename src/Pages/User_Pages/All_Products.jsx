import * as React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@material-ui/core/Button';
import MediaCard from './Components/MediaCard';
import Header from './Components/Header';
import { db } from '../../firebase-config';
import Footer from './Components/Footer';

export default function Products() {
  //  Get Categories Names
  const [value, setValue] = useState([10, 50]);
  const [categories, setCategories] = useState();
  const [currentCategory, setCurrentCategory] = useState('');

  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const productsCollection = collection(db, 'products');

  const categoriesCollection = collection(db, 'categories');

  useEffect(() => {
    // Get Products
    const getProducts = async () => {
      const data = await getDocs(productsCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoader(false);
      console.log(products);
    };
    // Get All Categories
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
      <div className="pt-32">
        curren
        <h1 className="bg-slate-100 pl-96 flex">
          Categories
          {' '}
          <ArrowForwardIcon />
          {' '}
          {currentCategory}
        </h1>
        <div className=" flex bg-slate-100">
          <div className="w-96 p-16 text-black ">
            <div className="flex flex-col items-start mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ">
              <h1 className="text-gray-700 block font-bold px-4 py-2 text-lg">
                Categories
              </h1>
              {categories?.map((item, key) => (
                <Button
                  className="text-black hover:font-bold px-4 py-2"
                  onClick={() => {
                    setCurrentCategory(item.name);
                  }}
                >
                  {item?.name}
                </Button>
              ))}
            </div>
            {/* Price component */}
            <div className=" mt-2 w-56 rounded-md shadow-lg bg-white ring-1">
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
            </div>
          </div>

          <hr />

          {loader ? (
            <div className="w-full">
              <div className="flex justify-center items-center h-full">
                <div className="w-20 h-20 border-t-4 border-b-4 border-blue-900 rounded-full animate-spin" />
              </div>
            </div>
          ) : products.length === 0 ? (
            <div>No products available!</div>
          ) : currentCategory !== '' ? (
            <div className="xl:flex">
              <div className="grid  lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
                {products.map((item) => (
                  <>
                    {currentCategory === item?.category ? (
                      <MediaCard obj={item} />
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
              <div className="w-96 h-full" />
            </div>
          ) : (
            <div className="xl:flex">
              <div className="grid  lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4">
                {products.map((item) => (
                  <div className="p-2">
                    <MediaCard obj={item} />
                  </div>
                ))}
              </div>
              <div className="w-96 h-full" />
            </div>
          )}
        </div>
        <div className="h-8" />
        <Footer />
      </div>
    </div>
  );
}
