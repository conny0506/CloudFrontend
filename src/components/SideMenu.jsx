import React, { useContext } from 'react';
import './sideMenu.css';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';
import { AppContext } from '../App';

function SideMenu({ active, sectionActive }) {
  const { currentUser } = useContext(AppContext);

  const filteredNavData = !currentUser
    ? navListData.filter(item => ['Home', 'Categories'].includes(item.name))
    : currentUser.username === 'deneme'
      ? navListData
      : navListData.filter(item =>
          ['Home', 'Categories', 'My Library', 'My Bag', 'View Profile'].includes(item.name)
        );

  const handleNavOnClick = (id, target) => {
    sectionActive(target);
  };

  return (
    <div className={`sideMenu ${active ? 'active' : ''}`}>
      <a href="#" className="logo">
        <i className="bi bi-controller"></i>
        <span className="brand">Gam-E</span>
      </a>
      <ul className="nav">
        {filteredNavData.map(item => (
          <NavListItem key={item.id || item._id} item={item} navOnClick={handleNavOnClick} />
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
