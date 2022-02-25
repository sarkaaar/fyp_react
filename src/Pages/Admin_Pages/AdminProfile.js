import React from "react";

export default function AdminProfile() {
  return (
    <div>
      <table className="table-auto justify-around">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>

            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> AbdulWali</td>
            <td>Fa18-bcs-011</td>
            <td>196@gmail.com</td>
            <td>0900</td>
          </tr>
        </tbody>
      </table>
      <button>Edit/Update Info</button>
    </div>
  );
}
