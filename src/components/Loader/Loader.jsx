import "./Loader.css";

export default function Spinner() {
  return (
<div className="absolute top-1/2 left-1/2 p-4  bg-white w-[400px] -translate-y-1/2 -translate-x-1/2">
    <div className="spinner">
      <div className="dot1"></div>
      <div className="dot2"></div>
    </div>
    </div>
  );
}
