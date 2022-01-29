import * as React from "react";
import Header from "../Components/Header";
import CartsCard from "../Components/CartsCard";
import Link from "@mui/material/Link";

export default function Review() {
  return (
    <div>
      <Header />
      <div style={{ padding: "50px",justifyContent:"space-around" }}>
        <CartsCard />
        <CartsCard />
        <CartsCard />
        <CartsCard />
        <CartsCard />
        <div
          style={{
            width: "300px",
            marginLeft: "auto",
            marginRight: 'auto',
            justifyItems: "right",
          }}
        >
          <h1>Total = 102 $</h1>
          <Link href="/checkout" variant="body2">
            <h1 style={{ color: "white",background:'#121212',maxWidth:'150px',padding:'25px' }}>Checkout</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
