import React, { useState } from 'react';
import './addGame.css';
import { addGame } from '../api/gamesApi';

function AddGame({ reference, fetchGames }) {
  const [newGame, setNewGame] = useState({
    name: '',
    genres: '',
    photo: ''
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

    const payload = {
      name: newGame.name,
      genre: newGame.genres.replace(/\s*,\s*/g, ','),
      isFeedbackEnabled: true,
      comments: [],
      averageRating: 0,
      totalPlayTime: 0,
      ratings: [],
      playedUsers: [],
      img: newGame.photo
    };

    try {
      await addGame(payload);
      alert("Game successfully added!");
      fetchGames();
      setNewGame({ name: '', genres: '', photo: '' });
    } catch (err) {
      alert("Game could not be added.");
    }
  };

  return (
    <section id="addG" className="addG" ref={reference}>
      <div className="container-fluid">
        <h1>Add Game</h1>
        <form className="add-game-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Game Name</label>
            <input type="text" name="name" value={newGame.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Genres (virgülle ayır)</label>
            <input type="text" name="genres" value={newGame.genres} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Photo URL</label>
            <input type="text" name="photo" value={newGame.photo} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-button">Add Game</button>
        </form>
      </div>
    </section>
  );
}

export default AddGame;
