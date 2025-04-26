import React from 'react'
import './home.css'
import GameSwiper from '../components/GameSwiper'
import GameCard from '../components/GameCard'

function Home({ games, reference }) {
  return (
    <section id="home" className="home active" ref={reference}>
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h2 className="sectionTitle">Games On Promotion</h2>
          </div>
        </div>
        <div className="row">
          {games.slice(0, 4).map(game => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
