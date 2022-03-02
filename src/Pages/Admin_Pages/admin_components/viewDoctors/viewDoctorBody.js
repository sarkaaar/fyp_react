import * as React from "react";

export default function ViewDoctorBody(item) {
  return (
    <div className="flex m-4 justify-between">
      <p className="text-xl m-2 w-1/12">{item.obj.name}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.email}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.dob}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.cnic}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.phone}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.c_name}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.c_address}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.c_phone}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.fees}</p>
      <p className="text-xl m-2 w-1/12">{item.obj.commision}</p>
    </div>
  );
}
