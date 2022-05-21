import * as React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-white flex-1 flex justify-end">
      <Link
        to={`/doctor/dashboard`}
        style={{ textDecoration: "none", padding: "10px", marginLeft: "10px" }}
      >
        DASHBOARD
      </Link>
      {/* <Link
          to={`/doctor/slots`}
          // activeClassName="active"
          style={{ textDecoration: "none",  padding: "10px" }}
        >
          SLOTS
        </Link> */}

      <Link
        to={`/doctor/sign_in`}
        style={{ textDecoration: "none", padding: "10px" }}
      >
        LOGIN / LOGOUT
      </Link>

      <Link
        to={`/doctor/viewAppointments`}
        // activeClassName="active"
        style={{ textDecoration: "none", padding: "10px" }}
      >
        VIEW APPOINTMENTS
      </Link>
    </div>
  );
}
