import React, { useEffect, useState } from 'react';

import { getDatabase } from './rxdbConfig';

const UserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const db = await getDatabase();
      const usersCollection = db.users;
      // get all users
      await usersCollection.find()
      .$ // the $ returns an observable that emits each time the result set of the query changes
      .subscribe(usersData => setUsers(usersData));
    //   setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = await getDatabase();
    const usersCollection = db.users;

    await usersCollection.insert({
      id: `${firstName}-${lastName}-${Date.now()}`,
      firstName,
      lastName
    });

    const usersData = await usersCollection.find().exec();
    setUsers(usersData);

    setFirstName('');
    setLastName('');
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <h3>Users List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserForm;
