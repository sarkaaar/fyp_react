import Header from "./Components/Header";
import { Rating, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Product() {
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(3);

  const product = {
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    name: "Product Name",
    price: 100,
  };
  return (
    <div>
      <Header />
      <div className="w-10/12 m-auto mt-10 border-2 border-gray-700 rounded-lg ">
        <div className=" flex">
          <div className="w-1/2 p-4">
            {/* main image */}
            <div>
              <img src={product.image} alt="img" />
            </div>
            {/* supporting images */}
            <div className="mt-4 flex gap-2">
              <img
                src={product.image}
                alt="img"
                className="w-20 h-20 object-fill"
              />
              <img
                src={product.image}
                alt="img"
                className="w-20 h-20 object-fill"
              />
              <img
                src={product.image}
                alt="img"
                className="w-20 h-20 object-fill"
              />
              <img
                src={product.image}
                alt="img"
                className="w-20 h-20 object-fill"
              />
            </div>
          </div>

          <div className="bg-gray-700 h-11/12 m-1 w-px"></div>
          <div className="p-4">
            <h1 className="text-4xl">{product.name}</h1>
            <h2 className="text-4xl mt-6">PKR {product.price}</h2>
            <p className="mt-4 text-2xl">Rating</p>
            <Rating
              className="px-2 mt-2"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <div className="product-quantity">
              <h3 className="mt-4 text-2xl">Quantity</h3>
              <div style={{ margin: "20px", display: "flex" }}>
                <Button
                  style={{ border: "1px solid grey", height: "55px" }}
                  disabled={quantity === 1 ? true : false}
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  <RemoveIcon />
                </Button>
                <p className="w-16 h-14 flex justify-center text-2xl mt-0 p-3 border-2 border-gray-900">
                  {quantity}
                </p>
                <Button
                  style={{ border: "1px solid grey", height: "55px" }}
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  <AddIcon />
                </Button>
              </div>
            </div>
            <div className="m-auto flex w-96">
              <Button startIcon={<ShareIcon />}>Share</Button>
              <hr />
              <Button startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
              <hr />
              <Button startIcon={<FavoriteBorderIcon />}>
                Add to Favorites
              </Button>
            </div>
          </div>
        </div>

        <div className="m-auto bg-gray-700 h-px  w-11/12"></div>

        <div className="w-10/12 m-auto mt-6">
          <h2 className="text-4xl">Product Description</h2>

          <p className="text-xl my-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, urna eu tempor consectetur, nisl nunc congue
            nisi, eget consectetur nisl nunc eget nisl. Pellentesque euismod,
            urna eu tempor consectetur, nisl nunc congue nisi, eget consectetur
            nisl nunc eget nisl. Pellentesque euismod, urna eu tempor
            consectetur, nisl nunc congue nisi, eget consectetur nisl nunc eget
            nisl. Pellentesque euismod, urna eu tempor consectetur, nisl nunc
          </p>
        </div>
      </div>
    </div>
  );
}
