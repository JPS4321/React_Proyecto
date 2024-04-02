import React from 'react'
import Navbar from './Components/NavBar/Navbar'
import Marquee from './Components/Marquee/Marquee'

const App = () => {
  return (
    
    <div className='container'>
      <Marquee text='Welcome to DivinoSeas'/>
      <Navbar/>
    </div>
  )
}

export default App
