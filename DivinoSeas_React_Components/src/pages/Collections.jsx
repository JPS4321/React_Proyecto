import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import ProductCard from '../Components/ProductCard/ProductCard';
import FilterToggle from '../Components/FilterTogle/FilterToggle';
import styles from './pages_css/Collections.module.css'; 
import image from '../assets/bottom01.png';
import RangeSlider from '../Components/RangeSlider/RangeSlider';
function Collections() {
    
    const products = [
        { id: 1, imageSrc: image, title: 'Product 1', price: '20.00' },
        { id: 2, imageSrc: image, title: 'Product 2', price: '20.00' },
        { id: 3, imageSrc: image, title: 'Product 3', price: '20.00' },
        { id: 4, imageSrc: image, title: 'Product 4', price: '20.00' },





        
    ];

    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas'/>
            <div className='subheader'>
                <Navbar/>
            </div>

            <div className={styles.layout}>
                <div className={styles.filters}>
                    <div>
                    <FilterToggle />
                    <RangeSlider />
        
                    
                    </div>
                </div>
                <div className={styles.productsGrid}>
                    {products.map(product => (
                        <ProductCard key={product.id} imageSrc={product.imageSrc} title={product.title} price={product.price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Collections;
