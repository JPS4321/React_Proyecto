// App.jsx
import React from 'react';
import Home from './AppAdmin/pages/MainPage/MainPageAdmin';
import Stock from './AppAdmin/pages/Stock/StockPage';
import Sales from './AppAdmin/pages/Sales/SalesPage';
import Settings from './AppAdmin/pages/Settings/SettingsPage';
import LoginPage from './AppAdmin/pages/Login/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Home" element={<PrivateRoute element = {<Home />} />} />
          <Route path="/Stock" element={<PrivateRoute element={<Stock />} />} />
          <Route path="/Sales" element={<PrivateRoute element={<Sales />} />} />
          <Route path="/Settings" element={<PrivateRoute element={<Settings />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
