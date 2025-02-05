"use client";

import React from "react";
import { createPayment } from "@/lib/xendit";

const TestClient = () => {
  const [invoiceUrl, setInvoiceUrl] = React.useState("");
  const handlePayment = async () => {
    const paymentData = {
      external_id: `invoice-${Date.now()}`,
      amount: 250,
      payer_email: "kylemastercoder14@gmail.com",
      description: "Payment for Product XYZ",
      currency: "PHP",
	  success_redirect_url: "http://localhost:3000/success",
	  failure_redirect_url: "http://localhost:3000/failure",
    };

    try {
      const payment = await createPayment(paymentData);
      setInvoiceUrl(payment.invoice_url);
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handlePayment}>Pay Now</button>
      {invoiceUrl && (
        <div>
          <p>Payment successful! Redirecting to payment page...</p>
          <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
            Click here if you are not redirected
          </a>
        </div>
      )}
    </div>
  );
};

export default TestClient;
