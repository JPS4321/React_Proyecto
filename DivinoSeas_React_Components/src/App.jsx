import React from 'react';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/Productpage';
import AboutUs from './pages/AboutUs';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import PaymentScreen from './pages/PaymentScreen';
import ShoppingCart from './pages/ShoppingCart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/collections/women" element={<Collections />} />
        <Route path="/collections/couple" element={<Collections />} />
        <Route path="/products/:productName" element={<ProductPage />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/PaymentScreen" element={<PaymentScreen />} />
        <Route path="/ShoppingCart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
};

export default App;
