import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth).then(() => {
      navigate("/sign_in");
    });
  };

  return (
    <div className="min-h-full">
      <div>
        <div className="flex flex-1 justify-end bg-gray-800">
          <Link
            to="/doctor/dashboard"
            style={{
              textDecoration: "none",
              padding: "10px",
              marginLeft: "10px",
              color: "white",
            }}
          >
            DASHBOARD
          </Link>
          <Link
            to="/doctor/appointments/view"
            style={{ textDecoration: "none", padding: "10px", color: "white" }}
          >
            VIEW APPOINTMENTS
          </Link>
          <NavLink
            to="/doctor/profile"
            style={{ textDecoration: "none", padding: "10px", color: "white" }}
          >
            VIEW PROFILE
          </NavLink>
          <NavLink
            to="/"
            style={{ textDecoration: "none", padding: "10px", color: "white" }}
          >
            USER VIEW
          </NavLink>
          <button type="button" onClick={logout} className="bg-gray-800 text-white">
            LOGOUT
          </button>
        </div>
      </div>
      <main className="flex-1 pb-8">
        <div className=" mx-auto mt-8 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
