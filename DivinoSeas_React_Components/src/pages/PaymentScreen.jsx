import React from 'react';
import './pages_css/PaymentScreen.css';
import PaymentHeader from '../Components/PaymentScreen/PaymentHeader';
import ContactForm from '../Components/PaymentScreen/ContactForm';
import ShippingForm from '../Components/PaymentScreen/ShippingForm';
import OrderSummary from '../Components/PaymentScreen/OrderSummary';
import PromoCodeInput from '../Components/PaymentScreen/PromoCodeInput';
import SubmitButton from '../Components/PaymentScreen/SubmitButton';
import PaymentOptions from '../Components/PaymentScreen/PaymentOptions';

const PaymentScreen = () => {
  return (
    <div className="payment-screen">
      <PaymentHeader />
      <div className="payment-content">
        <PaymentOptions />
        <ContactForm />
        <ShippingForm />
        <OrderSummary />
        <PromoCodeInput />
        <SubmitButton />
      </div>
    </div>
  );
};

export default PaymentScreen;
