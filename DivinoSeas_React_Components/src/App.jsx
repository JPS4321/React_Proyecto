import React from 'react'
import Navbar from './Components/NavBar/Navbar'
import Marquee from './Components/Marquee/Marquee'
import ProductCard from './Components/ProductCard/ProductCard'
import HeroSection0 from './Components/HeroSections/HeroSection0/HeroSection0'
import place from './assets/placeholder0.png'
import bg from './assets/bg-placeholder0.jpg'

const App = () => {
  return (
    
    <div className='container'>
      <Marquee text='Welcome to DivinoSeas'/>
      <Navbar/>
      <HeroSection0 backgroundImage={bg} buttonText="Shop Now"/>

      <div className='grid-container'>
        <ProductCard imageSrc={place} title="Place Holder 1" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 2" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 3" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 4" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 5" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 6" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 7" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 8" price="100" />
        <ProductCard imageSrc={place} title="Place Holder 9" price="100" />

      </div>
      

    </div>
    
  )
}

export default App
