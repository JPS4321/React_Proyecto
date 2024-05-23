import Home from './AppAdmin/pages/MainPage/MainPageAdmin';
import Stock from './AppAdmin/pages/Stock/StockPage';
import Sales from './AppAdmin/pages/Sales/SalesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/Stock" element={<Stock />} />        
        <Route path="/Sales" element={<Sales />} />        

      </Routes>
    </Router>
  )
}

export default App