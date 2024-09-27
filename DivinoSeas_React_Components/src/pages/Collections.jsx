import React, { useState } from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import ProductCard from '../Components/ProductCard/ProductCard';
import FilterToggle from '../Components/FilterTogle/FilterToggle';
import styles from './pages_css/Collections.module.css'; 
import image from '../assets/bottom01.png';
import hoverImage from '../assets/bottom02.png'; 
import RangeSlider from '../Components/RangeSlider/RangeSlider';
import Footer from '../Components/Footer/Footer'

function Collections() {
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(1000); 
    const [inStockFilter, setInStockFilter] = useState(false);
    const [outOfStockFilter, setOutOfStockFilter] = useState(false);

    const products = [
        { id: 1, imageSrc: image, hoverImageSrc: hoverImage, title: 'Product 1', price: 20.00, discount: 0, Existencia: false },
        { id: 2, imageSrc: image, hoverImageSrc: hoverImage, title: 'Product 2', price: 40.00, discount: 10, Existencia: true },
        { id: 3, imageSrc: image, hoverImageSrc: hoverImage, title: 'Product 3', price: 60.00, discount: 10, Existencia: false },
        { id: 4, imageSrc: image, hoverImageSrc: hoverImage, title: 'Product 4', price: 80.00, discount: 0, Existencia: true },
        { id: 5, imageSrc: image, hoverImageSrc: hoverImage, title: 'Product 5', price: 100.00, discount: 20, Existencia: true },
        { id: 6, imageSrc: image, hoverImageSrc: hoverImage, title: 'Product 6', price: 120.00, discount: 25, Existencia: true },
    ];
    
    const handleAvailabilityChange = (inStock, outOfStock) => {
        setInStockFilter(inStock);
        setOutOfStockFilter(outOfStock);
    };

    const filteredProducts = products.filter(product => {
        const finalPrice = product.discount > 0 ? product.price - (product.price * (product.discount / 100)) : product.price;
        
        const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;
        
        const matchesAvailability = 
            (inStockFilter && product.Existencia) || 
            (outOfStockFilter && !product.Existencia) ||
            (!inStockFilter && !outOfStockFilter); 
        
        return matchesPrice && matchesAvailability;
    });
    
    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas'/>
            <div className='navigation-bar'>
                <Navbar/>
            </div>

            <div className={styles.layout}>
                <div className={styles.filters}>
                    <div>
                        <FilterToggle onAvailabilityChange={handleAvailabilityChange} />
                        <RangeSlider 
                            minValue={minPrice} 
                            maxValue={maxPrice} 
                            onMinChange={setMinPrice} 
                            onMaxChange={setMaxPrice} 
                        />
                    </div>
                </div>
                <div className={styles.productsGrid}>
                    {filteredProducts.map(product => {
                        return (
                            <ProductCard 
                                key={product.id} 
                                imageSrc={product.imageSrc} 
                                hoverImageSrc={product.hoverImageSrc} 
                                title={product.title} 
                                price={product.price} 
                                discount={product.discount}  
                            />
                        );
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Collections;
