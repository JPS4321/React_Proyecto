import React from 'react';
import Navbar from '../../Componentsadmins/Navbar';
import ContenidoCreate from '../../Componentsadmins/ContenidoCreate';
import "./CreatePage.css"; 
const CreatePage = () => {
  return (
    <div className='CreatePage'>
      <Navbar />
      <ContenidoCreate />
    </div>
  );
};

export default CreatePage;
