import React from 'react';
import "./StockPage.css"; 
import Navbar from '../../Componentsadmins/Navbar';
import Contenido from "../../Componentsadmins/Contenido"
import Statbar from '../../Componentsadmins/Statbar';

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