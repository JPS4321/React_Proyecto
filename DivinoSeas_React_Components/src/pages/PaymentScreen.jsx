import React from 'react';
import './pages_css/PaymentScreen.css';
import PaymentHeader from '../Components/PaymentScreen/PaymentHeader';
import ContactForm from '../Components/PaymentScreen/ContactForm';
import ShippingForm from '../Components/PaymentScreen/ShippingForm';
import OrderSummary from '../Components/PaymentScreen/OrderSummary';
import PromoCodeInput from '../Components/PaymentScreen/PromoCodeInput';
import PaymentOptions from '../Components/PaymentScreen/PaymentOptions';
import Navbar from '../Components/NavBar/Navbar';

const PaymentScreen = () => {
  // Ejemplo hardcodeado
  const price = 200; // Precio de ejemplo
  const discount = 5; // Ejemplo de porcentaje de descuento

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
          <PromoCodeInput />
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
