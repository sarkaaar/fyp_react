import * as React from 'react';

export default function NewDashBoard() {
  return (
    <div className="bg-gray-100  font-sans leading-normal tracking-normal">
      <div className="  container grid-flow-col w-full mx-auto pt-20 pl-60 ">
        <div className=" grid grid-flow-col">
          <div className="w-full md:mt-1  mb-3 text-gray-800 leading-normal">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Order</h5>
              </div>
              <div className="p-5">
                <table className="w-full p-5 text-gray-700">
                  <thead>
                    <tr>
                      <th className="text-left text-blue-900">Pending Orders</th>
                      <th className="text-left text-blue-900">completed</th>
                      <th className="text-left text-blue-900">Returns </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>5</td>
                      <td>3</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>

                <p className="py-2">
                  <a href="/">See More issues...</a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-10/12 md:mt-1  mx-12 mb-3 text-gray-800 leading-normal">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Sales</h5>
              </div>
              <div className="p-5">
                <table className="w-full p-5 text-gray-700">
                  <thead>
                    <tr>
                      <th className="text-left text-blue-900">COD Sales</th>
                      <th className="text-left text-blue-900">
                        {' '}
                        Credit Card Sales
                      </th>
                      <th className="text-left text-blue-900"> Total Sales</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1000</td>
                      <td>2000</td>
                      <td>3000</td>
                    </tr>
                  </tbody>
                </table>

                <p className="py-2">
                  <a href="/">See More issues...</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" grid grid-flow-col">
          <div className="w-full md:mt-1  mb-3 text-gray-800 leading-normal">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">TODOS</h5>
              </div>
              <div className="p-5">
                <table className="w-full p-5 text-gray-700">
                  <thead>
                    <tr>
                      <th className="text-left text-blue-900">Name</th>
                      <th className="text-left text-blue-900">Date</th>
                      <th className="text-left text-blue-900">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Meeting with Stock vendor </td>
                      <td>10/12/2022</td>
                      <td>9:00 AM</td>
                    </tr>
                    <tr>
                      <td>Office Meeting </td>
                      <td>6/12/2022</td>
                      <td>9:00 AM</td>
                    </tr>

                  </tbody>
                </table>

                <p className="py-2">
                  <a href="/">See More issues...</a>
                </p>
              </div>
            </div>
          </div>
          <div className="w-10/12 md:mt-1  mx-12 mb-3 text-gray-800 leading-normal">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3">
                <h5 className="font-bold uppercase text-gray-600">Publicity</h5>
              </div>
              <div className="p-5">
                <table className="w-full p-5 text-gray-700">
                  <thead>
                    <tr>
                      <th className="text-left text-blue-900">Name</th>
                      <th className="text-left text-blue-900">Investment</th>
                      <th className="text-left text-blue-900">%</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Facebook boosting /ad campaign</td>
                      <td>10000</td>
                      <td>10%</td>
                    </tr>
                    <tr>
                      <td>insta gram boosting /ad campaign</td>
                      <td>5000</td>
                      <td>5%</td>
                    </tr>

                  </tbody>
                </table>

                <p className="py-2">
                  <a href="/">See More issues...</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
