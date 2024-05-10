import React from 'react';
import "./MainPageAdmin.css"; 

import Navbar from '../Componentsadmins/Navbar/Navbar';
import Statbar from '../Componentsadmins/Statbar/Statbar';
import Contenido from '../Componentsadmins/Contenido/Contenido';



const Home = () => {
    return (
      <div className='MainPageAdmin'>
          <Navbar />
          <Statbar />
          <Contenido />
      </div>
    );
}

export default Home;