import { padding } from '@mui/system';
import React from 'react';

export default function ViewOrdersHead() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>

      <h1>Name</h1>
      <h1>Products</h1>
      <h1>Prices</h1>
      <h1>Address</h1>
      <h1>Contacts</h1>

    </div>
  );
}
