import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/Productpage';
import AboutUs from './pages/AboutUs';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import { Link } from 'react-router-dom';





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  )
}

export default App
