import React, {useState} from 'react'
import "./Navbar.css"
import logo from "../../assets/Logo.png"
import search_Icon from "../../assets/search-b.png"


const Navbar = () => {
    const [val, setVal] = useState('Search');

  return (
    <div className='navbar'>
        <img src={logo} alt="DivinoSeas Logo" className='logo'/>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Shop Men</li>
            <li>Shop Women</li>
            <li>Shop Couple</li>
        </ul>

        <div className='search-box'>
            <input type="text" placeholder={val}/>
            <img src= {search_Icon} alt="" />
        </div>

    </div>
  )
}

export default Navbar
