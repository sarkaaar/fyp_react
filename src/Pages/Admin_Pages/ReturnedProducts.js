import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";

export default function ReturnedProducts() {
  const ret = [
    {
      username: "Ali",
      email: "Someone",
      orderNo: "12",
      products: ["Book", "Pen", "Pencil"],
      reason: "dont like the colot",
      date: "akhri hafta",
      status: "koi ata pata nai",
    },
  ];

  return (
    <>
      <Header />
      {/* <div className="flex"> */}
      <Sidebar />
      <div className="ml-72">
        <h1 className="text-4xl m-12">Products Returned -{">"}</h1>
        <div className="m-auto p-4 flex justify-between border-2 border-slate-900 w-11/12">
          <p className="w-1/6 text-2xl font-bold">User</p>
          <p className="w-1/6 text-2xl font-bold">Email</p>
          <p className="w-1/6 text-2xl font-bold">Order No.</p>
          <p className="w-1/6 text-2xl font-bold">Products</p>
          <p className="w-1/6 text-2xl font-bold">Reason</p>
          <p className="w-1/6 text-2xl font-bold">Date</p>
          <p className="w-1/6 text-2xl font-bold">Status</p>
        </div>
        {ret.map((item, index) => {
          return (
            <>
              <div className="m-auto p-4 flex justify-between w-11/12">
                <p className="w-1/6">{item.username}</p>
                <p className="w-1/6">{item.email}</p>

                <p className="w-1/6">{item.orderNo}</p>
                <p className="w-1/6">
                  {item.products.map((item) => {
                    return <p>{item}</p>;
                  })}
                </p>
                <p className="w-1/6">{item.reason}</p>
                <p className="w-1/6">{item.date}</p>
                <p className="w-1/6">{item.status}</p>
              </div>
              <hr className="w-10/12 m-auto" />
            </>
          );
        })}
      </div>
      {/* </div> */}
    </>
  );
}
