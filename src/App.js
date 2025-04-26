import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import GameDetail from './pages/GameDetail';
import Login from './pages/Login';

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [games, setGames] = useState([]);


  return (
    <AppContext.Provider value={{ library, setLibrary, bag, setBag, currentUser, setCurrentUser, games, setGames }}>
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
