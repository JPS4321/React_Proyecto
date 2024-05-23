import React from 'react';
import Navbar from '../../Componentsadmins/Navbar/Navbar';
import Contenido from '../../Componentsadmins/Contenido/Contenido';
import "./SalesPage.css"; 

const Sales = () => {
    return (
      <div className='SalesPage'>
          <Navbar />
          <Contenido />
      </div>
    );
}
export default Sales;