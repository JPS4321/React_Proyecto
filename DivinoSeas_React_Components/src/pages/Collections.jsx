import React, { useState } from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import ProductCard from '../Components/ProductCard/ProductCard';
import FilterToggle from '../Components/FilterTogle/FilterToggle';
import styles from './pages_css/Collections.module.css'; 
import image from '../assets/bottom01.png';
import RangeSlider from '../Components/RangeSlider/RangeSlider';

function Collections() {
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(10000); 
    const [inStockFilter, setInStockFilter] = useState(false);
    const [outOfStockFilter, setOutOfStockFilter] = useState(false);

    const products = [
        { id: 1, imageSrc: image, title: 'Product 1', price: 20.00, Existencia: false },
        { id: 2, imageSrc: image, title: 'Product 2', price: 40.00, Existencia: true },
        { id: 3, imageSrc: image, title: 'Product 3', price: 60.00, Existencia: false },
        { id: 4, imageSrc: image, title: 'Product 4', price: 80.00, Existencia: true },
    ];

    const handleAvailabilityChange = (inStock, outOfStock) => {
        setInStockFilter(inStock);
        setOutOfStockFilter(outOfStock);
    };

    const filteredProducts = products.filter(product => {
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesAvailability = 
            (inStockFilter && product.Existencia) || 
            (outOfStockFilter && !product.Existencia) ||
            (!inStockFilter && !outOfStockFilter); 
        return matchesPrice && matchesAvailability;
    });

    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas'/>
            <div className='subheader'>
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
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            imageSrc={product.imageSrc} 
                            title={product.title} 
                            price={product.price.toFixed(2)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Collections;
