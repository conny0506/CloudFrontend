import React, { useState, useEffect } from 'react';
import './categories.css';
import filterListData from '../data/filterListData';
import GameCard from '../components/GameCard';

function Categories({ games, reference }) {
  const [data, setData] = useState(games);
  const [filters, setFilters] = useState(filterListData);
  const [text, setText] = useState('');

  useEffect(() => {
    setData(games);
  }, [games]);

  const handleFilterGames = (genre) => {
    setFilters(
      filters.map(filter => ({
        ...filter,
        active: filter.name === genre
      }))
    );

    if (genre === 'All') {
      setData(games);
      return;
    }

    setData(games.filter(game => game.genre?.toLowerCase() === genre.toLowerCase()));
  };

  const handleSearchGames = (e) => {
    const searchText = e.target.value.toLowerCase();
    setText(searchText);
    setData(
      games.filter(game =>
        game.name?.toLowerCase().includes(searchText)
      )
    );
  };

  return (
    <section id="categories" className="categories" ref={reference}>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters">
              {filters.map(filter => (
                <li
                  key={filter._id}
                  className={`${filter.active ? 'active' : undefined}`}
                  onClick={() => handleFilterGames(filter.name)}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-end">
            <div className="search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                name="search"
                value={text}
                placeholder="Search"
                onChange={handleSearchGames}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {data.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
