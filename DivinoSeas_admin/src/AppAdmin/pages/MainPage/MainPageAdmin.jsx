import React from 'react';
import Navbar from '../../Componentsadmins/Navbar';
import ContentHome from '../../Componentsadmins/ContentHome';
import "./MainPageAdmin.css"; 

const Home = () => {
    return (
      <div className='MainPageAdmin'>
          <Navbar />
          <ContentHome />
      </div>
    );
}
export default Home;