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
            <li>Inicio</li>
            <li>Inventario</li>
            <li>Ventas</li>
            <li>Ajustes</li>
            <li>Shop Couple</li>
        </ul>
        <div>
            <img src={logo} alt="DivinoSeas Logo" className='logo'/>
        </div>
        <div className='search-box'>
            <input type="text" placeholder={val}/>
            <img src= {search_Icon} alt="" />
        </div>

    </div>
  )
}

export default Navbar