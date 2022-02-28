import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";

export default function ProductsList () {
  return (
    <div>
      <Header />
        <div className="flex">
        <Sidebar />
        <div className="ml-72">
          <h1>Products List</h1>
        </div>
        </div>
            
    </div>
  );
}
