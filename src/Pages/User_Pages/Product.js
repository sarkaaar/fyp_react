// import Header from "./Components/Header";
// import { Rating, Button } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { useState } from "react";
// import ShareIcon from "@mui/icons-material/Share";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// export default function Product() {
//   const [rating, setRating] = useState(0);
//   const [quantity, setQuantity] = useState(3);

//   const product = {
//     image:
//       "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//     name: "Product Name",
//     price: 100,
//   };
//   return (
//     <div>
//       <Header />
//       <div className="w-10/12 m-auto mt-10 border-2 border-gray-700 rounded-lg ">
//         <div className=" flex">
//           <div className="w-1/2 p-4">
//             {/* main image */}
//             <div>
//               <img src={product.image} alt="img" />
//             </div>
//             {/* supporting images */}
//             <div className="mt-4 flex gap-2">
//               <img
//                 src={product.image}
//                 alt="img"
//                 className="w-20 h-20 object-fill"
//               />
//               <img
//                 src={product.image}
//                 alt="img"
//                 className="w-20 h-20 object-fill"
//               />
//               <img
//                 src={product.image}
//                 alt="img"
//                 className="w-20 h-20 object-fill"
//               />
//               <img
//                 src={product.image}
//                 alt="img"
//                 className="w-20 h-20 object-fill"
//               />
//             </div>
//           </div>

//           <div className="bg-gray-700 h-11/12 m-1 w-px"></div>
//           <div className="p-4">
//             <h1 className="text-4xl">{product.name}</h1>
//             <h2 className="text-4xl mt-6">PKR {product.price}</h2>
//             <p className="mt-4 text-2xl">Rating</p>
//             <Rating
//               className="px-2 mt-2"
//               value={rating}
//               onChange={(event, newValue) => {
//                 setRating(newValue);
//               }}
//             />
//             <div className="product-quantity">
//               <h3 className="mt-4 text-2xl">Quantity</h3>
//               <div style={{ margin: "20px", display: "flex" }}>
//                 <Button
//                   style={{ border: "1px solid grey", height: "55px" }}
//                   disabled={quantity === 1 ? true : false}
//                   onClick={() => {
//                     setQuantity(quantity - 1);
//                   }}
//                 >
//                   <RemoveIcon />
//                 </Button>
//                 <p className="w-16 h-14 flex justify-center text-2xl mt-0 p-3 border-2 border-gray-900">
//                   {quantity}
//                 </p>
//                 <Button
//                   style={{ border: "1px solid grey", height: "55px" }}
//                   onClick={() => {
//                     setQuantity(quantity + 1);
//                   }}
//                 >
//                   <AddIcon />
//                 </Button>
//               </div>
//             </div>
//             <div className="m-auto flex w-96">
//               <Button variant="outlined" startIcon={<ShareIcon />}>Share</Button>
//               <hr />
//               <Button variant="outlined" startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
//               <hr />
//               <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
//                 Add to Favorites
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="m-auto bg-gray-700 h-px  w-11/12"></div>

//         <div className="w-10/12 m-auto mt-6">
//           <h2 className="text-4xl">Product Description</h2>

//           <p className="text-xl my-6">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque euismod, urna eu tempor consectetur, nisl nunc conguenisi, eget consectetur nisl nunc eget nisl. Pellentesque euismod,urna eu tempor consectetur, nisl nunc congue nisi, eget consecteturnisl nunc eget nisl. Pellentesque euismod, urna eu temporconsectetur, nisl nunc congue nisi, eget consectetur nisl nunc egetnisl. Pellentesque euismod, urna eu tempor consectetur, nisl nunc
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="flex">
            <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
            <div>
              <div className="mt-10">
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                              : "bg-gray-50 text-gray-200 cursor-not-allowed",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="p">
                              {size.name}
                            </RadioGroup.Label>
                            {size.inStock ? (
                              <div
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "absolute -inset-px rounded-md pointer-events-none"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">{product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}

                {/* Sizes */}

                <button
                  type="submit"
                  className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
