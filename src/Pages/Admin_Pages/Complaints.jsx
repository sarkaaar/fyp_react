import AdminLayout from "../../layouts/AdminLayout";
import FirebaseDataTable from "../../components/FirebaseDataTable";
import { db, auth } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function Complaints() {
  return (
    <>
      <AdminLayout>
        <div >
          <h1 className="mb-4 mx-6 text-left text-2xl font-bold">Complaints</h1>
          <FirebaseDataTable
            className="w-full m-auto"
            query={collection(db, "complain")}
            columns={[
              { key: "user", name: "User" },
              { key: "subject", name: "Subject" },
              { key: "description", name: "Description" },

            ]}
          />
        </div>
      </AdminLayout>
    </>
  );
}
