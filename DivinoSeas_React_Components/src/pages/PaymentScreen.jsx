import React from 'react';
import './pages_css/PaymentScreen.css';
import PaymentHeader from '../Components/PaymentScreen/PaymentHeader';
import ContactForm from '../Components/PaymentScreen/ContactForm';
import ShippingForm from '../Components/PaymentScreen/ShippingForm';
import OrderSummary from '../Components/PaymentScreen/OrderSummary';
import PromoCodeInput from '../Components/PaymentScreen/PromoCodeInput';
import PaymentOptions from '../Components/PaymentScreen/PaymentOptions';
import Navbar from '../Components/NavBar/Navbar';
import Marquee from '../Components/Marquee/Marquee';

const PaymentScreen = () => {
  return (
    <div className="container">
    <Marquee text='Welcome to Divino Seas' />
<Navbar/>
    <div className="payment-screen">
      <PaymentHeader />
      <div className="payment-content">
        <PaymentOptions />
        <ContactForm />
        <ShippingForm />
        <OrderSummary />
        <PromoCodeInput />
      </div>
    </div>
    </div>
  );
};

export default PaymentScreen;
