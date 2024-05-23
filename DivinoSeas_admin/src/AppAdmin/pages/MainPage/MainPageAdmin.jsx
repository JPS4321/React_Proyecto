import React from 'react';
import Navbar from '../../Componentsadmins/Navbar/Navbar';
import Contenido from '../../Componentsadmins/Contenido/Contenido';
import "./MainPageAdmin.css"; 

const Home = () => {
    return (
      <div className='MainPageAdmin'>
          <Navbar />
          <Contenido />
      </div>
    );
}
export default Home;