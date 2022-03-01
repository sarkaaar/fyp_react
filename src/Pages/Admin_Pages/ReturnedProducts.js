import Header from "./admin_components/Header";
import Sidebar from "./admin_components/Sidebar";

export default function ReturnedProducts() {
  const ret = [
    {
      username: "Ali",
      email: "Someonr",
      orderNo: "12",
      product: "Book",
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
          <h1 className="text-4xl">Products Returned -{">"}</h1>
          {ret.map((item, index) => {
            return (
              <div className="m-auto p-4 flex justify-between border-2 border-slate-900 w-11/12">
                <p>{item.username}</p>
                <p>{item.email}</p>
                <p>{item.orderNo}</p>
                <p>{item.product}</p>
                <p>{item.reason}</p>
                <p>{item.date}</p>
                <p>{item.status}</p>
              </div>
            );
          })}
        </div>
      {/* </div> */}
    </>
  );
}
