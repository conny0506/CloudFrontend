import React from 'react'
import './sideMenu.css'
import navListData from '../data/navListData'
import NavListItem from './NavListItem'
import { useContext } from 'react'
import { AppContext } from '../App'

function SideMenu({ active, sectionActive }) {
  const { currentUser } = useContext(AppContext)

  // Durumları kontrol ediyoruz:
  // 1. Kullanıcı giriş yapmadığında sadece Home ve Categories
  // 2. Sıradan kullanıcı giriş yaptığında Home, Categories, My Library, My Bag
  // 3. Admin kullanıcı giriş yaparsa tüm menüler görünsün
  const filteredNavData = !currentUser 
    ? navListData.filter(item => item.name === 'Home' || item.name === 'Categories') // 1. Durum
    : currentUser.username === 'admin' // 3. Durum (admin)
    ? navListData // Admin için tüm menüler
    : navListData.filter(item => 
        item.name === 'Home' || item.name === 'Categories' || 
        item.name === 'My Library' || item.name === 'My Bag'  || item.name ==='View Profile' // 2. Durum
    )

  const handleNavOnClick = (id, target) => {
    sectionActive(target)
  }

  return (
    <div className={`sideMenu ${active ? 'active' : undefined}`}>
      <a href="#" className="logo">
        <i className="bi bi-controller"></i>
        <span className="brand">Gam-E</span>
      </a>
      <ul className="nav">
        {filteredNavData.map(item => (
          <NavListItem key={item._id} item={item} navOnClick={handleNavOnClick} />
        ))}
      </ul>
    </div>
  )
}

export default SideMenu
