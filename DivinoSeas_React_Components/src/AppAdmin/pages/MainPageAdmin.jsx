import React from 'react';
import Navbar from '../Componentsadmin/Navbar/Navbar'
import Statbar from '../Componentsadmin/Statbar/Statbar'


const Home = () => {
    return (
    <div className='container'>
      <div>
        <Navbar/>
      </div>
        <Statbar/>
    </div>
    );
}

export default Home;