import React, { useState, useContext } from 'react';
import './addGame.css';
import { AppContext } from '../App';
import { addGameAPI } from '../api/api';

function AddGame({ reference }) {
  const { games, setGames } = useContext(AppContext);

  const [newGame, setNewGame] = useState({
    name: '',
    genre: '',
    img: '',
    description: '' // 👈 yeni alan
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGame(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gamePayload = {
      name: newGame.name,
      genre: newGame.genre,
      img: newGame.img,
      description: newGame.description, // 👈 eklendi
      isFeedbackEnabled: true
    };

    try {
      const addedGame = await addGameAPI(gamePayload);
      setGames(prev => [...prev, addedGame]);

      setNewGame({
        name: '',
        genre: '',
        img: '',
        description: ''
      });
    } catch (err) {
      console.error("Game eklenemedi:", err);
    }
  };

  return (
    <section id="addG" className="addG" ref={reference}>
      <div className="container-fluid">
        <h1>Add Game</h1>
        <form className="add-game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Game Name</label>
            <input
              type="text"
              name="name"
              value={newGame.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={newGame.genre}
              onChange={handleChange}
              placeholder="e.g. MOBA, RPG"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="img"
              value={newGame.img}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newGame.description}
              onChange={handleChange}
              placeholder="Enter game description..."
              rows={3}
              required
            />
          </div>

          <button type="submit" className="submit-button">Add Game</button>
        </form>
      </div>
    </section>
  );
}

export default AddGame;
