import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]); // Kullanıcıları tutacak state
  const { setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Kullanıcı verilerini JSON dosyasından almak için useEffect kullanıyoruz
  useEffect(() => {
    fetch('/api/usersData.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error loading users:', error));
  }, []);

  const handleLogin = () => {
    // Kullanıcıyı JSON verisi ile doğrulama
    const user = users.find(u => u.username === username);

    if (user) {
      // Kullanıcı bulunduysa, kullanıcı bilgisini setCurrentUser ile kaydediyoruz
      setCurrentUser({ username: user.username, avatar: user.avatar });
      setError(''); // Hata mesajını temizliyoruz
      navigate('/'); // Ana sayfaya yönlendirme
    } else {
      setError('User not found!'); // Hata mesajını gösteriyoruz
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
        />
        <button onClick={handleLogin}>Login</button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
