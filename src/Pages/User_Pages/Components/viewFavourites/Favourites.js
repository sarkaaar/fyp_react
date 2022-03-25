import React from "react";
import ViewFavourites from "./ViewFavourites";
import Rattoy from "../images/Rattoy.jpg";
import HouseCatShoes from "../images/HouseCatShoes.jpg";
import Header from "../../Components/Header"
export default function Favourites() {
  const data = [
    {
      name: "macbook",
      price: "1000",
      photo: Rattoy,
    },
    {
      name: "iphone 13",
      price: "500",
      photo: HouseCatShoes,
    },
  ];

  return (
    <div>
        <Header/>
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h1> Whishlist</h1>
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h1>Ammar Zahid</h1>

      <div>
        <div >
          {data.map((item) => (
            <ViewFavourites obj={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
