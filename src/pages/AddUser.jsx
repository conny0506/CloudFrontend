import React, { useState } from 'react';
import './addUser.css';

function AddUser({ users, setUsers, reference }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newUser.username.trim() || !newUser.avatar.trim()) {
      alert("Please fill in both Username and Avatar URL!");
      return;
    }

    const createdUser = {
      username: newUser.username,
      avatar: newUser.avatar
    };

    setUsers([...users, createdUser]);
    setNewUser({ username: '', avatar: '' });

    setSuccessMessage("User added successfully!");

    // Başarı mesajını 3 saniye sonra kaldır
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
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
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={newUser.avatar}
          onChange={handleChange}
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
