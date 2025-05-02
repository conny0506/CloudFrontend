import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import GameDetail from './pages/GameDetail';
import Login from './pages/Login';
import { fetchGames, fetchUsers } from './api/api';

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Sayfa yenilendiğinde currentUser'ı localStorage'dan geri yükle
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Diğer verileri yükle
    const loadData = async () => {
      try {
        const gamesData = await fetchGames();
        const usersData = await fetchUsers();
        setGames(gamesData);
        setUsers(usersData);
      } catch (error) {
        console.error('Veriler alınamadı:', error);
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        library, setLibrary,
        bag, setBag,
        games, setGames,
        users, setUsers,
        currentUser, setCurrentUser,
      }}
    >
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
