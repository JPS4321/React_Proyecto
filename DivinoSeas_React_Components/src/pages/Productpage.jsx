import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';
import Footer from '../Components/Footer/Footer';
import useProduct from '../hooks/useProduct';  // Importa tu hook personalizado
import './pages_css/ProductPage.css';

// Función para convertir un ArrayBuffer en una cadena Base64
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

function ProductPage() {
    const { state } = useLocation(); 
    const navigate = useNavigate();
    const { getProductById } = useProduct();  // Usa el hook personalizado

    const [productData, setProductData] = useState(null);
    const [hoverImageBase64, setHoverImageBase64] = useState(null);  // Estado para almacenar la imagen convertida
    const [amount, setAmount] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M'); 
    const [fetchError, setFetchError] = useState(null);  // Para manejar errores de fetch

    // useEffect que se ejecuta solo una vez al cargar el componente
    useEffect(() => {
        if (state?.id) {
            const fetchData = async () => {
                try {
                    console.log("Fetching product data for ID:", state.id);  // Depuración
                    const product = await getProductById(state.id);  // Llama a la API para obtener el producto
                    console.log("Product data fetched:", product);  // Depuración

                    if (!product) {
                        setFetchError('Product not found');
                        return;
                    }

                    const mappedProduct = {
                        title: product?.nombre || 'Unknown Product',
                        price: parseFloat(product?.precio || 0),
                        imageSrc: product?.imagen || '',
                        hoverImageSrc: product?.secondimage?.data || '',
                        cantidad_xs: product?.cantidad_xs || 0,
                        cantidad_s: product?.cantidad_s || 0,
                        cantidad_m: product?.cantidad_m || 0,
                        cantidad_l: product?.cantidad_l || 0
                    };
                    setProductData(mappedProduct);

                    // Convertir el Buffer de hoverImageSrc a Base64
                    if (mappedProduct.hoverImageSrc) {
                        const base64String = arrayBufferToBase64(mappedProduct.hoverImageSrc);
                        setHoverImageBase64(`data:image/png;base64,${base64String}`);
                    }
                } catch (err) {
                    console.error("Failed to fetch product data:", err);  // Depuración de error
                    setFetchError('Failed to fetch product data');
                }
            };

            fetchData();
        }
    }, [state]);

    const increaseAmount = () => setAmount(amount + 1);
    const decreaseAmount = () => {
        if (amount > 1) setAmount(amount - 1);
    };
    const handleSizeClick = (size) => setSelectedSize(size);
    const addToCart = () => navigate('/ShoppingCart');

    if (fetchError) {
        return <div>{fetchError}</div>;
    }

    if (!productData) {
        return <div>Loading product data...</div>;
    }

    const { title, imageSrc, price } = productData;
    const displayedPrice = Number(price) || 0;

    const sizeOptions = [
        { size: 'XS', number: productData.cantidad_xs },
        { size: 'S', number: productData.cantidad_s },
        { size: 'M', number: productData.cantidad_m },
        { size: 'L', number: productData.cantidad_l }
    ];

    return (
        <div className='ProductPageContainer'>
            <Marquee text='Welcome to Divino Seas' />
            <div className='navigation-bar'>
                <Navbar />
            </div>
            <div className='ProductPageContent'>
                <div className='left-column'>
                    <img src={imageSrc} alt='Product Image 1' />
                    {hoverImageBase64 && <img src={hoverImageBase64} alt='Product Image 2' />}
                </div>
                <div className='right-column'>
                    <h1 className='Title'>{title}</h1>
                    <p className='Price'>
                        Q{typeof displayedPrice === 'number' && !isNaN(displayedPrice) ? displayedPrice.toFixed(2) : 'N/A'}
                    </p>
                    <p className='Size'>Size: {selectedSize}</p>
                    <div className='SizesButtonRow'>
                        {sizeOptions.map((option) => (
                            <button
                                key={option.size}
                                className={`sizeButton ${selectedSize === option.size ? 'selected' : ''} ${option.number === 0 ? 'disabledButton' : ''}`} 
                                onClick={() => handleSizeClick(option.size)}
                                disabled={option.number === 0}  
                            >
                                {option.size}
                            </button>
                        ))}
                    </div>
                    <div className="CounterContainer">
                        <p className="CounterLabel">Amount:</p>
                        <div className="Counter">
                            <button className="CounterButton" onClick={decreaseAmount}>-</button>
                            <p className="CounterValue">{amount}</p>
                            <button className="CounterButton" onClick={increaseAmount}>+</button>
                        </div>
                        <button className="addToCartButton" onClick={addToCart}>Add to Cart</button>
                    </div>
                    <hr />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductPage;
