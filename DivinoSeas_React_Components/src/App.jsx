import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/Productpage';
import AboutUs from './pages/AboutUs';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import PaymentScreen from './pages/PaymentScreen';
import { Link } from 'react-router-dom';






const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<MainPage />} /> 
        <Route path="/product" element={<ProductPage />} />
=======
        <Route path="/" element={<MainPage />} />
>>>>>>> ae243fb6f1cc075b6873eddaa503bdcdc2502708
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/collections/women" element={<Collections />} />
        <Route path="/collections/couple" element={<Collections />} />
        <Route path="/products/:productName" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  )
}

export default App
