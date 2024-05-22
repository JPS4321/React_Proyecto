import React from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import ProductCard from '../Components/ProductCard/ProductCard';
import FilterToggle from '../Components/FilterTogle/FilterToggle';
import styles from './pages_css/Collections.module.css'; // Importa el archivo CSS

function Collections() {
    // Datos simulados de productos
    const products = [
        { id: 1, imageSrc: 'path/to/image1.jpg', title: 'Product 1', price: '20.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 3, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },
        { id: 2, imageSrc: 'path/to/image2.jpg', title: 'Product 2', price: '30.00' },

        // Más productos...
    ];

    return (
        <div className='container'>
            <Marquee text='Welcome to Divino Seas'/>
            <div className='subheader'>
                <Navbar/>
            </div>
            <div className={styles.layout}>
                <div className={styles.filters}>
                    {/* Contenido de filtros */}
                    <p>Filtros</p>
                    <div>
                    <FilterToggle />
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
