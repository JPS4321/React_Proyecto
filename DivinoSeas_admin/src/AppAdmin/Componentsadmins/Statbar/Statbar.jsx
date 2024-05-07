import "./Statbar.css"; 
import React, { useState } from 'react';
import filtroS from '../../../assets/filtro.png'; 



const Statbar = () => {
    const [val, setVal] = useState('Search');
  return (
    <div className='statbar'>
        <ul>
            <li>Todo</li>
            <li>Enviado</li>
            <li>Pendiente</li>
        </ul>
        <div>
        <h1 className="titulo-ventas">Ventas</h1>
        </div>
        
        <div>
            <img src= {filtroS} alt="" className='filtro'/>
        </div>
        <div className="statbar">
            <ul>
                <li>Reporte Personalizado</li>
            </ul>
        </div>
        
    </div>
    
  )
}

export default Statbar