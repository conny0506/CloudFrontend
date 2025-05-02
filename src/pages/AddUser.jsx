import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import './addUser.css';
import { addUser } from '../api/api'; // API'den fonksiyon getiriliyor

function AddUser({ reference }) {
  const { users, setUsers } = useContext(AppContext);
  const [newUser, setNewUser] = useState({
    username: '',
    avatar: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.username.trim() || !newUser.avatar.trim()) {
      alert("Please fill in both Username and Avatar URL!");
      return;
    }

    try {
      const createdUser = await addUser({
        username: newUser.username,
        avatar: newUser.avatar
      });

      setUsers([...users, createdUser]);
      setNewUser({ username: '', avatar: '' });
      setSuccessMessage("User added successfully!");

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error("Kullanıcı eklenemedi:", err);
    }
  };

  return (
    <section id="addU" className="addU" ref={reference}>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={newUser.avatar}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
      </form>
    </section>
  );
}

export default AddUser;
