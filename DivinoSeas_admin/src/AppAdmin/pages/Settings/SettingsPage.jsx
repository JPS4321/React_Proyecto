import React from 'react';
import Navbar from '../../Componentsadmins/Navbar';
import ContentHome from '../../Componentsadmins/ContentHome';
import "./SettingsPage.css"; 

const Settings = () => {
    return (
      <div className='SettingsPage'>
          <Navbar />
          <ContentHome />
      </div>
    );
}
export default Settings;