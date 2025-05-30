import React from 'react';
import { SwiperSlide } from 'swiper/react';
import './gameSlide.css';

function GameSlide({ game, active, toggleVideo }) {
  return (
    <SwiperSlide>
      <div className="gameSlider">
        <img src={game.img || '/assets/placeholder.jpg'} alt="Game Image" />

        <div className={`video ${active ? 'active' : undefined}`}>
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // sabit video
            title={game.name}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>

        <div className="content">
          <h2>{game.name || 'Untitled Game'}</h2>
          <p>
            {game.genre && <strong>Genre: {game.genre}</strong>}
          </p>

          {/* ✅ Açıklama eklendi */}
          <p className="game-description">
            {game.description
              ? (game.description.length > 150
                  ? game.description.slice(0, 150) + '...'
                  : game.description)
              : 'No description available.'}
          </p>

          <div className="buttons">
            <a href="#" className="orderBtn">Order Now</a>
            <a href="#" className={`playBtn ${active ? 'active' : undefined}`}
              onClick={toggleVideo}>
              <span className="pause">
                <i className="bi bi-pause-fill"></i>
              </span>
              <span className="play">
                <i className="bi bi-play-fill"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
}

export default GameSlide;
