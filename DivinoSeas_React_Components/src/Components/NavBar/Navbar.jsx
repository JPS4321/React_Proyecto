import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import "./Navbar.css"
import logo from "../../assets/Logo.png"
import search_Icon from "../../assets/search-b.png"



const Navbar = () => {
    const [val, setVal] = useState('Search');

  return (
    <div className='navbar2'>
        <img src={logo} alt="DivinoSeas Logo" className='logo'/>
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/collections">Shop Women</Link></li>
        <li><Link to="/collections">Shop Couple</Link></li>
        </ul>

        <div className='search-box'>
            <input type="text" placeholder={val}/>
            <img src= {search_Icon} alt="" />
        </div>

    </div>
  )
}

export default Navbar
