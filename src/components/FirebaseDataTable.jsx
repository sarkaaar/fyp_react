import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';

import DataTable from './DataTable';

export default function FirebaseDataTable({ query, ...props }) {
  const [data, setData] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    getDocs(query)
      .then((d) => Promise.resolve(d.docs.map((i) => ({
        id: i.id,
        ...i.data(),
      }))))
      .then(setData)
      .catch(setError);
  }, [query]);

  return <DataTable {...props} data={data} loading={!data && !error} />;
}
