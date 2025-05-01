import React, { useState, useRef, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import './main.css';
import SideMenu from '../components/SideMenu';
import Header from './Header';
import Home from './Home';
import Categories from './Categories';
import MyLibrary from './MyLibrary';
import Bag from './Bag';
import AddGame from './AddGame';
import RemGame from './RemGame';
import AddUser from './AddUser';
import RemUser from './RemUser';
import EnableRating from './EnableRating';
import DisableRating from './DisableRating';
import ViewProfile from './ViewProfile';
import { getAllGames } from '../api/gamesApi';

function Main() {
  const { library, bag, games, setGames, users, setUsers, currentUser } = useContext(AppContext);
  const [active, setActive] = useState(false);

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bagRef = useRef();
  const addGRef = useRef();
  const remGRef = useRef();
  const addURef = useRef();
  const remURef = useRef();
  const disRnCRef = useRef();
  const enaRnCRef = useRef();
  const viewProfileRef = useRef();

  const sections = [
    { name: 'home', ref: homeRef },
    { name: 'categories', ref: categoriesRef },
    { name: 'library', ref: libraryRef },
    { name: 'bag', ref: bagRef },
    { name: 'addG', ref: addGRef },
    { name: 'remG', ref: remGRef },
    { name: 'addU', ref: addURef },
    { name: 'remU', ref: remURef },
    { name: 'disRnC', ref: disRnCRef },
    { name: 'enaRnC', ref: enaRnCRef },
    { name: 'viewProfile', ref: viewProfileRef }
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleSectionActive = (target) => {
    sections.forEach(section => {
      if (section.ref.current) {
        if (section.ref.current.id === target) {
          section.ref.current.classList.add('active');
        } else {
          section.ref.current.classList.remove('active');
        }
      }
    });
  };

  //  Backend'den oyunları çek
  const fetchGames = async () => {
    const data = await getAllGames();
    setGames(data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} />
      <div className={`banner ${active ? 'active' : ''}`}>
        <Header toggleActive={handleToggleActive} />
        <div className="container-fluid">
          {games.length > 0 && (
            <>
              <Home games={games} reference={homeRef} />
              <Categories games={games} reference={categoriesRef} />
              <MyLibrary games={library} reference={libraryRef} />
              <Bag games={bag} reference={bagRef} />
              <AddGame reference={addGRef} fetchGames={fetchGames} />
              <RemGame games={games} reference={remGRef} fetchGames={fetchGames} />
              <AddUser users={users} reference={addURef} />
              <RemUser users={users} setUsers={setUsers} reference={remURef} />
              <EnableRating games={games} setGames={setGames} reference={enaRnCRef} />
              <DisableRating games={games} setGames={setGames} reference={disRnCRef} />
              {currentUser && currentUser.username !== 'admin' && (
                <ViewProfile games={games} users={users} reference={viewProfileRef} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
