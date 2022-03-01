import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";

export default function ReturnedProducts() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-72">
          <h1>Products Returned</h1>
        </div>
      </div>
    </>
  );
}
