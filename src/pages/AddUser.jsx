import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import './addUser.css';
import { addUser } from '../api/api';

function AddUser({ reference }) {
  const { users, setUsers } = useContext(AppContext);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    avatarUrl: '',
    canComment: true,
    canRate: true
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.username.trim() || !newUser.email.trim()) {
      alert("Please fill in both Username and Email!");
      return;
    }

    const usernameTaken = users.some(
      u => u.username.toLowerCase() === newUser.username.trim().toLowerCase()
    );
    const emailTaken = users.some(
      u => u.email.toLowerCase() === newUser.email.trim().toLowerCase()
    );

    if (usernameTaken || emailTaken) {
      setErrorMessage(
        usernameTaken
          ? "This username is already taken."
          : "This email is already registered."
      );
      setSuccessMessage('');
      return;
    }

    try {
      const createdUser = await addUser({
        username: newUser.username,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl || "",
        canComment: newUser.canComment,
        canRate: newUser.canRate,
        playedGameIds: [],
        playedGames: [],
        ratedGames: []
      });

      setUsers([...users, createdUser]);
      setNewUser({
        username: '',
        email: '',
        avatarUrl: '',
        canComment: true,
        canRate: true
      });

      setSuccessMessage("User added successfully!");
      setErrorMessage('');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error("Kullanıcı eklenemedi:", err.message);
      setErrorMessage(err.message || "Failed to add user.");
      setSuccessMessage('');
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
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={newUser.avatarUrl}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="canComment"
            checked={newUser.canComment}
            onChange={handleChange}
          />
          Can Comment
        </label>
        <label>
          <input
            type="checkbox"
            name="canRate"
            checked={newUser.canRate}
            onChange={handleChange}
          />
          Can Rate
        </label>

        <button type="submit">Add User</button>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </form>
    </section>
  );
}

export default AddUser;
