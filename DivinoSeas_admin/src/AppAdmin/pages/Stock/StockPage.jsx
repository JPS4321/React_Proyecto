import React from 'react';
import "./StockPage.css"; 
import Navbar from '../../Componentsadmins/Navbar/Navbar';
import Contenido from '../../Componentsadmins/Contenido/Contenido';
import Statbar from '../../Componentsadmins/Statbar/Statbar';

const Stock = () => {
    return (
      <div className='StockPage'>
          <Navbar />
          <Statbar />
          <Contenido />

      </div>
    );
}
export default Stock;