import React from 'react'
import "./Navbar.css"
import logo from "../../assets/Logo.png"
import search_Icon from "../../assets/search-b.png"


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="DivinoSeas Logo" className='logo'/>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Shop Women</li>
            <li>Shop Men</li>
            <li>Shop Couple</li>
        </ul>
        
        <div className='search-box'>
            <input type="text" placeholder="Search"/>
            <img src= {search_Icon} alt="" />
        </div>

    </div>
  )
}

export default Navbar
