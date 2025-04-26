import React from 'react';
import './remUser.css';

function RemUser({ users, setUsers, reference }) {
  
  const handleRemoveUser = (username) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.username !== username);
      setUsers(updatedUsers);
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
