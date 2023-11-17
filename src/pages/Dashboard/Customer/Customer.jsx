import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axios/axios-instance";
import TableBody from "./TableBody";

const Customer = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axiosInstance.get("/users");
        // console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, []);

  // console.log(users);
  return (
    <div className='main-container'>
      <div className='overflow-x-auto'>
        <table id='customers'>
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableBody key={index} user={user} index={index}></TableBody>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
