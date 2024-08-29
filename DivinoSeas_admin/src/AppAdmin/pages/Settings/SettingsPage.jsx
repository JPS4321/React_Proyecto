import React from 'react';
import Navbar from '../../Componentsadmins/Navbar';
import UserProfile from '../../Componentsadmins/SettingsContent';
import CardSetContainer from '../../Componentsadmins/CardSettCont';
import "./SettingsPage.css"; 

const Settings = () => {
    return (
      <div className='SettingsPage'>
          <Navbar />
          <UserProfile />
      </div>
    );
}
export default Settings;