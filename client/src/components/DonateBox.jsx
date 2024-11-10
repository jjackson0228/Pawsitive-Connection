// src/components/DonateBox.jsx
import React from "react";
import styled from "@emotion/styled";

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
`;

const DonateBox = () => {
  const handleDonateClick = () => {
    // Redirect to the Stripe donation page
    window.location.href = "https://stripe.com"; // Replace with your actual Stripe link
  };

  return <DonateButton onClick={handleDonateClick}>Donate</DonateButton>;
};

export default DonateBox;