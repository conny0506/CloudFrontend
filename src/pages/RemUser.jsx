import React, { useContext } from 'react';
import './remUser.css';
import { AppContext } from '../App';
import { deleteUser } from '../api/api';

function RemUser({ reference }) {
  const { users, setUsers } = useContext(AppContext);

  const handleRemoveUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const success = await deleteUser(id);
      if (success) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Silme hatası:", err.response?.data || err.message);
      alert("Kullanıcı silinemedi: " + (err.response?.data || err.message));
    }
  };

  // "admin" kullanıcıyı filtrele
  const visibleUsers = users.filter(user => user.username !== 'admin');

  return (
    <section id="remU" className="remU" ref={reference}>
      <h1>Remove User</h1>
      <div className="user-list">
        {visibleUsers.length === 0 ? (
          <p>No users available.</p>
        ) : (
          visibleUsers.map(user => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <img src={user.avatarUrl || '/assets/default-avatar.jpg'} alt={user.username} className="user-avatar" />
                <div>
                  <strong>{user.username}</strong><br />
                  <small>{user.email}</small>
                </div>
              </div>
              <button className="remove-user-btn" onClick={() => handleRemoveUser(user.id)}>
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
