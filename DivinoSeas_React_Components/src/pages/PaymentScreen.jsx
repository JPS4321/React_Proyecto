import React, { useState } from 'react';
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
  const [price] = useState(location.state?.price || 0); // Asigna `totalAmount` o 0 si no está disponible
  const [discount, setDiscount] = useState(0);

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
          <ContactForm />
          <ShippingForm />
          {/* Passing price and discount to OrderSummary */}
          <OrderSummary price={price} discount={discount} />
          {/* Passing applyDiscount function to PromoCodeInput */}
          <PromoCodeInput applyDiscount={applyDiscount} />
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
