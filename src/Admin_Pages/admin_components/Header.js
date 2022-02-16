import * as React from "react";

import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div
        style={{
          background: "#1976d2",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NavLink
          to={`/admin/dashboard`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          DASHBOARD
        </NavLink>

        <NavLink
          to={`/admin/sign_in`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          LOGIN
        </NavLink>

        <NavLink
          to={`/admin/inventory`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          INVENTORY
        </NavLink>
        <NavLink
          to={`/admin/addProducts`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          ADD PRODUCTS
        </NavLink>
        <NavLink
          to={`/admin/orders`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          ORDERS
        </NavLink>
        <NavLink
          to={`/admin/addDoctor`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          ADD DOCTOR
        </NavLink>
        <NavLink
          to={`/admin/viewDoctor`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          VIEW DOCTORS
        </NavLink>
        <NavLink
          to={`/admin/addCategory`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          ADD CATEGORY
        </NavLink>
        <NavLink
          to={`/admin/viewCategory`}
          activeClassName="active"
          style={{ textDecoration: "none", color: "white", padding: "10px" }}
        >
          VIEW CATEGORY
        </NavLink>
      </div>
    </div>
  );
}
