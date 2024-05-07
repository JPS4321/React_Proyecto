import React from 'react';
import "./MainPageAdmin.css"; 

import Navbar from '../Componentsadmins/Navbar/Navbar';
import Statbar from '../Componentsadmins/Statbar/Statbar';



const Home = () => {
    return (
      <div className='MainPageAdmin'>
        <div>
          <Navbar />
        </div>
          <Statbar />
      </div>
    );
}

export default Home;