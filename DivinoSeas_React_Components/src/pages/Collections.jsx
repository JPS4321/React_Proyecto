import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import ProductCard from '../Components/ProductCard/ProductCard';
import FilterToggle from '../Components/FilterTogle/FilterToggle';
import styles from './pages_css/Collections.module.css'; 
import RangeSlider from '../Components/RangeSlider/RangeSlider';
import Footer from '../Components/Footer/Footer';
import useProduct from '../hooks/useProduct'; // Importa el hook que creaste

function Collections() {
    const [minPrice, setMinPrice] = useState(0); 
    const [maxPrice, setMaxPrice] = useState(1000); 
    const [inStockFilter, setInStockFilter] = useState(false);
    const [outOfStockFilter, setOutOfStockFilter] = useState(false);

    const { getAllProducts, loading, error } = useProduct();
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(6); // Controla cuántos productos se muestran inicialmente

    // Cargar los productos cuando el componente se monte
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getAllProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    const handleAvailabilityChange = (inStock, outOfStock) => {
        setInStockFilter(inStock);
        setOutOfStockFilter(outOfStock);
    };

    const filteredProducts = products.filter(product => {
        // Calcular el precio final
        const finalPrice = product.discount > 0 
            ? product.precio - (product.precio * product.discount) / 100 
            : product.precio;

        // Verificar si el precio está en el rango
        const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;

        // Verificar la existencia
        const hasStock = 
            product.cantidad_xs > 0 || 
            product.cantidad_s > 0 || 
            product.cantidad_m > 0 || 
            product.cantidad_l > 0;

        const matchesAvailability = 
            (inStockFilter && hasStock) || 
            (outOfStockFilter && !hasStock) || 
            (!inStockFilter && !outOfStockFilter); 

        return matchesPrice && matchesAvailability;
    });

    const loadMoreProducts = () => {
        setVisibleProducts(prevVisible => prevVisible + 6); // Muestra 6 productos más al hacer clic en "Cargar más"
    };

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos: {error}</p>;

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
                    {filteredProducts.slice(0, visibleProducts).map(product => {
                        return (
                            <ProductCard 
                                key={product.id_producto} 
                                id={product.id_producto} 
                                imageSrc={product.imagen} 
                                hoverImageSrc={product.secondimage} 
                                title={product.nombre} 
                                price={product.precio} 
                                discount={product.discount}  
                            />
                        );
                    })}
                </div>

                {visibleProducts < filteredProducts.length && (
                    <div className={styles.loadMore}>
                        <button onClick={loadMoreProducts}>Cargar más</button>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default Collections;
