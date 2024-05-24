import React, { useState } from 'react';
import "../styles/Navbar.css";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoadmin.png';


const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHome = () => {
    navigate('/');
  };

  const handleStock = () => {
    navigate('/Stock');
  };

  const handleSales = () => {
    navigate('/Sales');
  };

  const handleSettings = () => {
    navigate('/Settings');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navbar'>
      <div className='nav-section left'>
        <ul className='nav-list'>
          <li onClick={handleStock}>Inventario</li>
          <li onClick={handleSales}>Ventas</li>
        </ul>
      </div>
      <div className='logo-container'>
        <img src={logo} alt="DivinoSeas Logo" className='logo' />
      </div>
      <div className='nav-section right'>
        <ul className='nav-list'>
          <li onClick={handleHome}>Inicio</li>
          <li onClick={handleSettings}>Ajustes</li>
        </ul>
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        &#9776;
      </div>
      {menuOpen && (
        <div className={`nav-items ${menuOpen ? 'active' : ''}`}>
          <ul className='nav-list'>
            <li onClick={handleStock}>Inventario</li>
            <li onClick={handleSales}>Ventas</li>
            <li onClick={handleHome}>Inicio</li>
            <li onClick={handleSettings}>Ajustes</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;