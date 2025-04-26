import React, { useEffect } from 'react';
import './remUser.css';

function RemUser({ users, setUsers, reference }) {
  // users verisini almak için useEffect ekliyoruz
  useEffect(() => {
    fetch('/api/usersData.json')  // JSON dosyasını doğru dizinden alıyoruz
      .then(res => res.json())    // JSON formatında veriyi alıyoruz
      .then(data => {
        console.log("Fetched user data:", data);  // Veriyi konsola yazdırıyoruz
        setUsers(data);  // users state'ini güncelliyoruz
      })
      .catch(err => {
        console.log("Error fetching user data:", err);
      });
  }, [setUsers]);  // Veriyi yalnızca component ilk render edildiğinde alıyoruz

  const handleRemoveUser = (username) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.username !== username); // user.username'a göre silme işlemi yapıyoruz
      setUsers(updatedUsers);  // Güncellenmiş listeyi set ediyoruz
    }
  };

  return (
    <section id="remU" className="remU" ref={reference}>
      <h1>Remove User</h1>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users available to remove.</p>  // Kullanıcı yoksa bu mesajı gösteriyoruz
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
