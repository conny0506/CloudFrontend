import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import GameDetail from './pages/GameDetail';
import Login from './pages/Login';

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  const handleSetCurrentUser = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error('Error fetching games:', err));

    fetch('/api/usersData.json')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <AppContext.Provider value={{
      library, setLibrary,
      bag, setBag,
      currentUser, setCurrentUser: handleSetCurrentUser,
      games, setGames,
      users, setUsers
    }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
