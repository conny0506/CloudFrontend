import React, { useContext } from 'react';
import './header.css';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Header({ toggleActive }) {
  const { library, bag, currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null); // Kullanıcıyı null yaparak çıkış işlemi yapıyoruz
    navigate('/'); // Ana sayfaya yönlendiriyoruz
  };

  return (
    <header>
      <a href="#" className="menu" onClick={toggleActive}>
        <i className="bi bi-sliders"></i>
      </a>
      <div className="userItems">
        <a href="#" className="icon">
          <i className="bi bi-heart-fill"></i>
          <span className="like">{library.length}</span>
        </a>
        <a href="#" className="icon">
          <i className="bi bi-bag-fill"></i>
          <span className="bag">{bag.length}</span>
        </a>

        {/* Kullanıcı giriş durumuna göre gösterim */}
        {currentUser ? (
          <div className="avatar">
            <a href="#">
              <img src={currentUser.avatar} alt={currentUser.username} />
            </a>
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
