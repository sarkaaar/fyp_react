import Header from './admin_components/Header';
import Sidebar from './admin_components/Sidebar';

export default function Reports() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-72">
          <h1>Reports page</h1>
        </div>
      </div>
    </>
  );
}
