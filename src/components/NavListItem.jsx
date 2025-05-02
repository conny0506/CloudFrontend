import React from 'react';

function NavListItem({ item, navOnClick }) {
  const handleClick = (e) => {
    e.preventDefault(); // Sayfa sıfırlamasını engeller
    navOnClick(item._id, item.target);
  };

  return (
    <li>
      <a
        href="#"
        className={item.active ? 'active' : undefined}
        onClick={handleClick}
      >
        <i className={`bi ${item.icon}`}></i>
        <span className="navName">{item.name}</span>
      </a>
    </li>
  );
}

export default NavListItem;
