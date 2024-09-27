import React, { useState } from 'react';
import './pages_css/PaymentScreen.css';
import PaymentHeader from '../Components/PaymentScreen/PaymentHeader';
import ContactForm from '../Components/PaymentScreen/ContactForm';
import ShippingForm from '../Components/PaymentScreen/ShippingForm';
import OrderSummary from '../Components/PaymentScreen/OrderSummary';
import PromoCodeInput from '../Components/PaymentScreen/PromoCodeInput';
import PaymentOptions from '../Components/PaymentScreen/PaymentOptions';
import Navbar from '../Components/NavBar/Navbar';

const PaymentScreen = () => {
  const [price] = useState(200); // Assume this is fetched or passed from a higher level
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
