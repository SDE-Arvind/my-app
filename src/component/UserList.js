import './Component.css';
import React, { useEffect, useState } from 'react';
import { getDatabase } from '../database/rxdbConfig';

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = await getDatabase();
      const usersCollection = db.users;
      // get all users
      await usersCollection.find()
      .$ // the $ returns an observable that emits each time the result set of the query changes
      .subscribe(usersData => setUsers(usersData));

      usersCollection.count()
      .$
      .subscribe(count=>setCount(count))
    };

    fetchUsers();
  }, []);

  return (
    <div className='userListContainer'>
      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <label>{user.firstName}  </label>
            <label2>{user.lastName}  </label2>
          </li>
        ))}
      </ul>
      <h3>Count: {count}</h3>

    </div>
  );
};

export default UserList;
