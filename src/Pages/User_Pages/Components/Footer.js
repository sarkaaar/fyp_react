import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <div className="z-10 border-gray-800">
      <div className="flex bg-gray-900 justify-around p-12">
        <div>
          <h1 className="text-lg text-white p-2 font-bold">My Account</h1>
          <a href="/orders">
            <h2 className="text-lg text-white p-2">Orders</h2>
          </a>
          <a href="/favourites">
          <h2 className="text-lg text-white p-2">Favourites</h2>
          </a>
          <h2 className="text-lg text-white p-2">Product Return</h2>
        </div>
        <div>
          <h1 className="text-lg text-white p-2 font-bold">Careers</h1>
          <h2 className="text-lg text-white p-2">Apply </h2>
          <h2 className="text-lg text-white p-2">Become a Doctor</h2>
          <h2 className="text-lg text-white p-2">PFAQ</h2>
        </div>
        <div>
          <h1 className="text-lg text-white p-2 font-bold">Services</h1>
          <h2 className="text-lg text-white p-2">Maps</h2>
          <h2 className="text-lg text-white p-2">Appointments</h2>
          <h2 className="text-lg text-white p-2">Online Check-Up</h2>
        </div>
        <div>
          <h1 className="text-lg text-white p-2 font-bold">Social</h1>
          <h2 className="text-lg text-white p-2">
            <FacebookIcon /> FaceBook
          </h2>
          <h2 className="text-lg text-white p-2">
            <InstagramIcon /> Instagram
          </h2>
          <h2 className="text-lg text-white p-2">
            <TwitterIcon /> Twitter
          </h2>
          <h2 className="text-lg text-white p-2">
            <YouTubeIcon /> Youtube
          </h2>
        </div>
      </div>

      <div className=" flex justify-center bg-gray-800">
        <h1 className="text-white text-xl p-2">Developed By github@SARKAAAR</h1>
      </div>
      <hr />
    </div>
  );
}
