import React from "react";

const TableBody = ({ user, index }) => {
  //   console.log(index);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  );
};

export default TableBody;
