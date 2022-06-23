import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="z-10 border-gray-800 pt-8">
      {/* <NavLink   to="/about">
       <button className="bg-red-600 text-4xl  text-white">
          Become A Doctor
        </button>
      </NavLink> */}
      <div className="flex justify-around bg-gray-900 p-12">
       
        <div>
          <NavLink
            to="/profile"
            className="text-white text-2xl font-bold hover:text-gray-300"
          >
            <h1 className="p-2 text-lg font-bold text-white">My Account</h1>
          </NavLink>
          
          <a href="/profile/orders">
            <h2 className="p-2 text-lg text-white">Orders</h2>
          </a>
          <a href="/profile/favourites">
            <h2 className="p-2 text-lg text-white">Favourites</h2>
          </a>
          <a href="/profile/ProductReturns">
            <h2 className="p-2 text-lg text-white">Product Return</h2>
          </a>
        </div>

        <div>
          <a href="/services">
          <h1 className="p-2 text-lg font-bold text-white">Services</h1>
          </a>
          <a href="/maps">
            <h2 className="p-2 text-lg text-white">Maps</h2>
          </a>
          <a href="/viewAppointments">
            <h2 className="p-2 text-lg text-white">Appointments</h2>
          </a>
          <a href="/about">
            <h2 className="p-2 text-lg text-white">Online Check-Up</h2>
          </a>
        </div>
        <div>
          <h1 className="p-2 text-lg font-bold text-white">Social</h1>
          <a href="https://www.facebook.com/" target="_blank">
            <h2 className="p-2 text-lg text-white">
              <FacebookIcon /> FaceBook
            </h2>
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <h2 className="p-2 text-lg text-white">
              <InstagramIcon /> Instagram
            </h2>
          </a>
          <a href="https://twitter.com/" target="_blank">
            <h2 className="p-2 text-lg text-white">
              <TwitterIcon /> Twitter
            </h2>
          </a>
          <a href="https://youtube.com" target="_blank">
            <h2 className="p-2 text-lg text-white">
              <YouTubeIcon /> Youtube
            </h2>
          </a>
        </div>
      </div>

      <div className=" flex justify-center bg-gray-800">
        <h2 className="p-2 text-xl text-white">
          All Copyrights Reserved by CS-47 FYP Goup
        </h2>
      </div>
      <hr />
    </div>
  );
}
