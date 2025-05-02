import React from 'react';
import './remUser.css';
import { deleteUser } from '../api/api';

function RemUser({ users, setUsers, reference }) {
  const handleRemoveUser = async (username) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const success = await deleteUser(username);
      if (success) {
        setUsers(prev => prev.filter(user => user.username !== username));
      }
    } catch (err) {
      console.error("Kullanıcı silinemedi:", err);
    }
  };

  return (
    <section id="remU" className="remU" ref={reference}>
      <h1>Remove User</h1>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users available to remove.</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="user-item">
              <div className="user-info">
                <img src={user.avatar} alt={user.username} className="user-avatar" />
                <span>{user.username}</span>
              </div>
              <button className="remove-user-btn" onClick={() => handleRemoveUser(user.username)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default RemUser;
