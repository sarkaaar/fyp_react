import * as React from 'react';

export default function ViewInventoryHead() {
  return (
    <div>
      <div className="m-auto p-4 flex justify-between border-2 border-slate-900 w-11/12">
        <h2 className="w-1/12 text-2xl font-bold">Sr.</h2>
        <h2 className="w-1/6 text-2xl font-bold">Name</h2>
        <h2 className="w-1/6 text-2xl font-bold">Cost Price</h2>
        <h2 className="w-1/6 text-2xl font-bold">Sale Price</h2>
        <h2 className="w-2/6 text-2xl font-bold justify-center flex">Description</h2>
        <h2 className="w-1/6 text-2xl font-bold">Stock</h2>
        <h2 className="w-1/6 text-2xl font-bold">Actions</h2>
      </div>
      <hr style={{ width: '90%' }} />
    </div>
  );
}
