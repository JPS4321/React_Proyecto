import React from 'react';
import Home from './AppAdmin/pages/MainPage/MainPageAdmin';
import Stock from './AppAdmin/pages/Stock/StockPage';
import Sales from './AppAdmin/pages/Sales/SalesPage';
import Settings from './AppAdmin/pages/Settings/SettingsPage';
import LoginPage from './AppAdmin/pages/Login/LoginPage';
import ReportPage from './AppAdmin/pages/ReportPage/ReportPage';
import AdminPage from './AppAdmin/pages/AdminPage/AdminPage';
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
          <Route path="/Report" element={<PrivateRoute element={<ReportPage />} />} />
          <Route path="/Adminusers" element={<PrivateRoute element={<AdminPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;