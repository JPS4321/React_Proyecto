import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './pages_css/PaymentScreen.css';
import PaymentHeader from '../Components/PaymentScreen/PaymentHeader';
import ContactForm from '../Components/PaymentScreen/ContactForm';
import ShippingForm from '../Components/PaymentScreen/ShippingForm';
import OrderSummary from '../Components/PaymentScreen/OrderSummary';
import PromoCodeInput from '../Components/PaymentScreen/PromoCodeInput';
import PaymentOptions from '../Components/PaymentScreen/PaymentOptions';
import Navbar from '../Components/NavBar/Navbar';

const PaymentScreen = () => {
  const location = useLocation();
  const [price] = useState(location.state?.price || 0);
  const [discount, setDiscount] = useState(0);
  const [email, setEmail] = useState('');
  const cartData = location.state?.cartData || []; // Guardamos `cartData` para enviarlo a `ShippingForm`

  useEffect(() => {
    // Log para ver el contenido de cartData cuando el componente se monta o cuando cartData cambia
    console.log('Contenido de cartData:', cartData);
  }, [cartData]);

  const applyDiscount = (discountValue) => {
    setDiscount(discountValue);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="payment-screen">
        <PaymentHeader />
        <div className="payment-content">
          <PaymentOptions />
          <ContactForm email={email} setEmail={setEmail} />
          <ShippingForm email={email} price={price} discount={discount} cartData={cartData} /> {/* Pasamos `cartData` */}
          <OrderSummary price={price} discount={discount} />
          <PromoCodeInput applyDiscount={applyDiscount} />
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
