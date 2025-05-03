import React, { useContext } from 'react';
import './header.css';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Header({ toggleActive }) {
  const { library, bag, currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header>
      <button className="menu" onClick={toggleActive}>
        <i className="bi bi-slider"></i>
      </button>

      <div className="userItems">
        {currentUser && (
          <>
            <div className="icon">
              <i className="bi bi-heart-fill"></i>
              <span className="like">{library.length}</span>
            </div>
            <div className="icon">
              <i className="bi bi-bag-fill"></i>
              <span className="bag">{bag.length}</span>
            </div>
          </>
        )}

        {currentUser ? (
          <div className="avatar">
            <img
              src={currentUser.avatarUrl || '/assets/default-avatar.jpg'}
              alt={currentUser.username}
              className="user-avatar-img"
            />
            <div className="user">
              <span>{currentUser.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate('/login')}>
            LOGIN AS A USER
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
