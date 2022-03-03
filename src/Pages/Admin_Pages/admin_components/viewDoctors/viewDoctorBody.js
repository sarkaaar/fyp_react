import * as React from "react";

export default function ViewDoctorBody(item) {
  return (
    <tbody>
      <tr>
        <td className=""> {item.obj.name}</td>
        <td className="">{item.obj.email}</td>
        <td className="">{item.obj.dob}</td>
        <td className="">{item.obj.cnic}</td>
        <td className="">{item.obj.phone}</td>
        <td className="">{item.obj.clinicName}</td>
        <td className="">{item.obj.clinicAddress}</td>
        <td className="">{item.obj.clinicPhone}</td>
        <td className="">{item.obj.fees}</td>
        <td className="">{item.obj.commision}</td>
      </tr>
    </tbody>
  );
}
