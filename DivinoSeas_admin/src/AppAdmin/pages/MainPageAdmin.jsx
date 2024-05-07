import React from 'react';
import Navbar from '../Componentsadmins/Navbar/Navbar';
import Statbar from '../Componentsadmins/Statbar/Statbar';



const Home = () => {
    return (
    <div className='container'>
      <div>
        <Navbar />
      </div>
        <Statbar />
    </div>
    );
}

export default Home;