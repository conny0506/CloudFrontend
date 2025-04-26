import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';  // AppContext'ten verileri alıyoruz
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

function Main() {
  const { library, bag, games, setGames, users, setUsers } = useContext(AppContext); // users ve setUsers'i burada alıyoruz
  const [active, setActive] = useState(false);

  // Refs for sections
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

  // Sections array to manage active sections
  const sections = [
    { name: 'home', ref: homeRef, active: true },
    { name: 'categories', ref: categoriesRef, active: false },
    { name: 'library', ref: libraryRef, active: false },
    { name: 'bag', ref: bagRef, active: false },
    { name: 'addG', ref: addGRef, active: false },
    { name: 'remG', ref: remGRef, active: false },
    { name: 'addU', ref: addURef, active: false },
    { name: 'remU', ref: remURef, active: false },
    { name: 'disRnC', ref: disRnCRef, active: false },
    { name: 'enaRnC', ref: enaRnCRef, active: false }
  ];

  // Toggle side menu active state
  const handelToggleActive = () => {
    setActive(!active);
  };

  // Handle section active state
  const handleSectionActive = (target) => {
    sections.forEach(section => {
      if (section.ref?.current) {
        if (section.ref.current.id === target) {
          section.ref.current.classList.add('active');
        } else {
          section.ref.current.classList.remove('active');
        }
      }
    });
  };

  // Fetch games data when component mounts
  useEffect(() => {
    fetch('/api/gamesData.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, [setGames]); 

  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} />
      <div className={`banner ${active ? 'active' : undefined}`}>
        <Header toggleActive={handelToggleActive} />
        <div className="container-fluid">
          {games && games.length > 0 && (
            <>
              <Home games={games} reference={homeRef} />
              <Categories games={games} reference={categoriesRef} />
              <MyLibrary games={library} reference={libraryRef} />
              <Bag games={bag} reference={bagRef} />
              <AddGame games={games} reference={addGRef} addGame={(newGame) => setGames(prev => [...prev, newGame])} />
              <RemGame games={games} setGames={setGames} reference={remGRef} />
              <AddUser users={users} reference={addURef} />
              <RemUser users={users} setUsers={setUsers} reference={remURef} />
              <EnableRating games={games} setGames={setGames} reference={enaRnCRef} />
              <DisableRating games={games} setGames={setGames} reference={disRnCRef} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
