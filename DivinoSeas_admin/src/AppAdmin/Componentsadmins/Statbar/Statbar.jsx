import "./Statbar.css"; 
import React, { useState } from 'react';
import filtroS from '../../../assets/filtro.png'; 
import search_Icon from '../../../assets/search-b.png';


const Statbar = () => {
    const [val, setVal] = useState('Search');
  return (
    <div className='statbar'>
        <div>
            <h4>AGREGAR NUEVO ESTILO</h4>
        </div>
        <div className='search-box2'>
            <input type="text" placeholder={val} className='input'/>
            <img src= {search_Icon} alt="" className='img'/>
        </div>
        <div>
            <h1 style={{ color: '#16d8e8' }}>INVENTARIO</h1>
        </div>
        <div className="statbar">
            <h4>REPORTE DE ENTRADAS Y SALIDAS</h4>
        </div>
        
    </div>
    
  )
}

export default Statbar