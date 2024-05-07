import Home from './AppAdmin/pages/MainPageAdmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />        

      </Routes>
    </Router>
  )
}

export default App