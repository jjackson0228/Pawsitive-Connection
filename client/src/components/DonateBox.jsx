// src/components/DonateBox.jsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 50px 20px 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const AmountInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;

  &:focus {
    border-color: #4da3d1;
    outline: none;
  }
`;

const DonateButton = styled.button`
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 1.5em;
  color: white;
  background-color: #4da3d1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3b8cbf;
  }

  &:disabled {
    background-color: #a1c6d4;
    cursor: not-allowed;
  }
`;

const DonationForm = styled.form`
  width: 100%;
`;


const DonateBox = () => {
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleDonateClick = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('PaymentMethod created:', paymentMethod);
      // Call your backend to process the payment and handle the donation
      // Example: await fetch('/api/donate', { method: 'POST', body: JSON.stringify({ paymentMethod, amount }) });
    }
  };

  return (
    <Container>
      <Title>Make a Donation</Title>
      <DonationForm onSubmit={handleDonateClick}>
        <AmountInput 
          type="number" 
          placeholder="Enter donation amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
        <CardElement />
        <DonateButton type="submit" disabled={!stripe}>
          Donate
        </DonateButton>
      </DonationForm>
    </Container>
  );
};

export default DonateBox;
