import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { users, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
  
    if (user) {
      const userData = { username: user.username, avatar: user.avatar };
  
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData)); // Kalıcı olarak kaydet
  
      setError('');
      navigate('/');
    } else {
      setError('User not found!');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
