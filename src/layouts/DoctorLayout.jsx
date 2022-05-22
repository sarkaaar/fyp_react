import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export default function AdminLayout({ children }) {
  //   useEffect(() => {
  //     if (authState === "error") {
  //       navigate("/sign_in");
  //     }
  //   }, [authState]);
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth).then(() => {
      navigate("/sign-in");
    });
  };

  return (
    <div className="min-h-full">
      <div>
        <div className="bg-white flex-1 flex justify-end">
          <Link
            to="/doctor/dashboard"
            style={{
              textDecoration: "none",
              padding: "10px",
              marginLeft: "10px",
            }}
          >
            DASHBOARD
          </Link>

          <button type="button" onClick={logout}>
            LOGOUT
          </button>

          <Link
            to="/doctor/viewAppointments"
            style={{ textDecoration: "none", padding: "10px" }}
          >
            VIEW APPOINTMENTS
          </Link>
        </div>
      </div>
      <main className="flex-1 pb-8">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
