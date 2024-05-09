import React, {useState} from 'react';
import "./Navbar.css";
import logo from '../../../assets/Logo.png';
import usuario from '../../../assets/usuario.png';


const Navbar = () => {
    const [val, setVal] = useState('Search');

  return (
    <div className='navbar'>
        <ul>
            <li>Inicio</li>
            <li>Inventario</li>
            <li>Ventas</li>
            <li>Ajustes</li>
        </ul>
        <div className='logo-container'>
            <img src={logo} alt="DivinoSeas Logo" className='logo'/>
        </div>
        <div>
            <img src={usuario} alt="DivinoSeas Usuario" className='usuario' title='Iniciar sesión'/>
        </div>

    </div>
  )
}

export default Navbar