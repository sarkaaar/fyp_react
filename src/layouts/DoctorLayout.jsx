import { Link, useNavigate } from "react-router-dom";
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
        <div className="bg-gray-800 flex-1 flex justify-end">
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
            to="/doctor/viewAppointments"
            style={{ textDecoration: "none", padding: "10px", color: "white" }}
          >
            VIEW APPOINTMENTS
          </Link>

          <button type="button" onClick={logout} className="bg-gray-800">
            LOGOUT
          </button>
        </div>
      </div>
      <main className="flex-1 pb-8">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-8">{children}</div>
      </main>
    </div>
  );
}
