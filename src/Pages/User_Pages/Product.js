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
  return (
    <div>
      <Header />
      <div className="product-container" style={{ display: "flex" }}>
        <div className="product-image" style={{ width: "50%" }}>
          <img
            style={{ width: "100%" }}
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          />
        </div>
        <div className="product-info" style={{ padding: "20px" }}>
          <h1>Product Name</h1>
          <h2>$12.99</h2>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <div className="product-quantity">
            <h3>Quantity</h3>
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
              <p
                style={{
                  width: "70px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "x-large",
                  marginTop: "0px",
                  border: "1px solid grey",
                  padding: "12px",
                }}
              >
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
          <div
            className="product-actions"
            style={{ display: "flex", width: "50%", margin: "auto" }}
          >
            <Button startIcon={<ShareIcon />}>Share</Button>
            <hr />
            <Button startIcon={<ShoppingCartIcon />}>Add to Cart</Button>
            <hr />

            <Button startIcon={<FavoriteBorderIcon />}>Add to Favorites</Button>
          </div>
        </div>
      </div>
      <div className="product-description">
        <h2>Product Description</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, urna eu tempor consectetur, nisl nunc congue nisi, eget
          consectetur nisl nunc eget nisl. Pellentesque euismod, urna eu tempor
          consectetur, nisl nunc congue nisi, eget consectetur nisl nunc eget
          nisl. Pellentesque euismod, urna eu tempor consectetur, nisl nunc
          congue nisi, eget consectetur nisl nunc eget nisl. Pellentesque
          euismod, urna eu tempor consectetur, nisl nunc
        </p>
      </div>
    </div>
  );
}
