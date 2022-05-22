import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import AdminLayout from "../../layouts/AdminLayout";


export default function Dashboard() {
  // const navigate = useNavigate();
  const [user, set1User] = useState({});
  const [db_user, setdb_User] = useState({});
  const [loading, setLoading] = useState(false);

  const userRef = collection(db, 'users');

  const getUser = async () => {
    const q = query(userRef, where('email', '==', user?.email));
    await getDocs(q)
      .then((res) => {
        setLoading(true);
        setdb_User(res.docs[0]._document.data.value.mapValue.fields);

        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    getUser();
    if (loading === true && db_user?.role?.stringValue === 'admin') {
      console.log('admin');
    }
  }, [user]);

  return (
    <>
      <AdminLayout>
      <div className="flex">
        <div className="">
          <h1>Logged in user is</h1>
          <h1>{user?.email}</h1>
          <button
            onClick={async () => {
              console.log(db_user?.role?.stringValue);
            }}
          >
            Click
          </button>
        </div>

        {/* <div classNameName="bg-gray-100 ml-48 font-sans leading-normal tracking-normal">
          <div classNameName="  container grid-flow-col w-full mx-auto pt-20 pl-60 ">
            <div classNameName=" grid grid-flow-col">
              <div classNameName="w-full md:mt-1  mb-3 text-gray-800 leading-normal">
                <div className="bg-white border rounded shadow">
                  <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Order</h5>
                  </div>
                  <div className="p-5">
                    <table className="w-full p-5 text-gray-700">
                      <thead>
                        <tr>
                          <th className="text-left text-blue-900">
                            Pending Orders
                          </th>
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
                      <a href="#">See More issues...</a>
                    </p>
                  </div>
                </div>
              </div>
              <div classNameName="w-10/12 md:mt-1  mx-12 mb-3 text-gray-800 leading-normal">
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
                            {" "}
                            Credit Card Sales
                          </th>
                          <th className="text-left text-blue-900">
                            {" "}
                            Total Sales
                          </th>
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
                      <a href="#">See More issues...</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div classNameName=" grid grid-flow-col">
              <div classNameName="w-full md:mt-1  mb-3 text-gray-800 leading-normal">
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
                      <a href="#">See More issues...</a>
                    </p>
                  </div>
                </div>
              </div>
              <div classNameName="w-10/12 md:mt-1  mx-12 mb-3 text-gray-800 leading-normal">
                <div className="bg-white border rounded shadow">
                  <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">
                      Publicity
                    </h5>
                  </div>
                  <div className="p-5">
                    <table className="w-full p-5 text-gray-700">
                      <thead>
                        <tr>
                          <th className="text-left text-blue-900">Name</th>
                          <th className="text-left text-blue-900">
                            Investment
                          </th>
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
                      <a href="#">See More issues...</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div classNameName="ml-72">
          <Button variant="contained">View Profile</Button>
          <Button variant="contained">View Orders</Button>
          <Button variant="contained">View Queries</Button>
        </div> */}
      </div>
      </AdminLayout>
    </>
  );
}
