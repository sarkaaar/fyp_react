import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
// import AddCategory from "../../Categories";

export default function ViewInventoryBody(item) {
  return (
    <div className="m-auto p-4 flex justify-between w-11/12">
      <p className="w-1/6">{item.obj.name}</p>
      <p className="w-1/6">{item.obj.costPrice}</p>
      <p className="w-1/6">{item.obj.salePrice}</p>
      <p className="w-2/6">{item.obj.description}</p>
      <p className="w-1/6">{item.obj.stock}</p>
      <div className="w-1/6">
        <Button>
          <EditIcon />
        </Button>
        <Button>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
}
