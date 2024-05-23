import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logo from '../../../assets/Logo.png';
import usuario from '../../../assets/usuario.png';


const Navbar = () => {
    const navigate = useNavigate();

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
  return (
    <div className='navbar'>
        <ul>
            <li onClick={handleHome}>Inicio</li>
            <li onClick={handleStock}>Inventario</li>
            <li onClick={handleSales}>Ventas</li>
            <li onClick={handleSettings}>Ajustes</li>
        </ul>
        <div className='logo-container'>
            <img src={logo} alt="DivinoSeas Logo" className='logo'/>
        </div>
            <img src={usuario} alt="DivinoSeas Usuario" className='usuario' title='Iniciar sesión'/>

    </div>
  )
}

export default Navbar