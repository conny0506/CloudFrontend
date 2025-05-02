import React, { useContext } from 'react';
import './shopBagItem.css';
import { AppContext } from '../App';

function ShopBagItem({ game, index }) {
  const { bag, setBag } = useContext(AppContext);

  const handleRemoveFromBag = () => {
    setBag(bag.filter(item => item.id !== game.id));
  };

  return (
    <tr className="shopBagItem">
      <th scope="row">{index + 1}</th>
      <td>
        <img src={game.img || '/assets/placeholder.jpg'} alt={game.name} className="img-fluid" />
      </td>
      <td>{game.name || 'Unnamed Game'}</td>
      <td>{(game.price ?? 0) === 0 ? 'Free' : `$${(game.price ?? 0).toFixed(2)}`}</td>
      <td>
        <a href="#" onClick={handleRemoveFromBag}>
          <i className="bi bi-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default ShopBagItem;
