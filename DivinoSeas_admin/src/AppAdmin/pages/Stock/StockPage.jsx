import React from 'react';
import "./StockPage.css"; 
import Navbar from '../../Componentsadmins/Navbar';
import Contenido from "../../Componentsadmins/Contenido"

const Stock = () => {
    return (
      <div className='StockPage'>
          <Navbar />
          <Contenido />

      </div>
    );
}
export default Stock;