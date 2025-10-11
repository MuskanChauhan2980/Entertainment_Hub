 import React, { useEffect, useState } from "react";
import "./permium.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SBQQ98IVPARgywefJsHkBDg53L7dfCBbXzZ6uUU68Ht8s2gKu16VyuJdSRED3jtyZMfbHzS5hn7gmJZdOZr6txH00rgCfdMud");

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet. Please wait...");
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error: createPMError } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name, email },
    });

    if (createPMError) {
      setMessage(`Card Error: ${createPMError.message}`);
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/process-secure-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          name,
          paymentMethodId: paymentMethod.id,
          amount: 50,
        }),
      });

      const data = await response.json();

      if (data.error || (!data.success && !data.requiresAction)) {
        setMessage(`Payment Failed: ${data.msg || data.error || "Unknown error."}`);
      } else if (data.requiresAction) {
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret);
        if (confirmError) {
          setMessage(`Authentication Failed: ${confirmError.message}`);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          setMessage("Payment successful! Authentication complete.");
          document.getElementById("secure-payment-form").classList.add("success-pulse");
        } else {
          setMessage(`Payment status unexpected: ${paymentIntent.status}`);
        }
      } else if (data.success) {
        setMessage("Payment Succeeded! Thank you for your purchase.");
        document.getElementById("secure-payment-form").classList.add("success-pulse");
        setName("");
        setEmail("");
        cardElement.clear();
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="secure-payment-page">
      <div className="container">
        <h1>Premium Subscription</h1>
        
        <div className="price-display">
          <p className="amount">$50.00</p>
          <p className="description">One-time payment for premium access</p>
        </div>

        <form id="secure-payment-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="name-input">
              <i className="fa-solid fa-user"></i> Full Name
            </label>
            <input
              type="text"
              id="name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="email-input">
              <i className="fa-solid fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="card-details-section">
            <h2>
              <i className="fa-solid fa-credit-card"></i> Payment Information
            </h2>
            <div className="field-group">
              <label htmlFor="card-element">Credit or Debit Card</label>
              <CardElement
                id="card-element"
                onChange={(event) => setCardError(event.error ? event.error.message : "")}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      fontFamily: '"Inter", "Poppins", sans-serif',
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: {
                      color: "#dc2626",
                      iconColor: "#dc2626",
                    },
                  },
                  hidePostalCode: true,
                }}
              />
              {cardError && <div id="card-errors">{cardError}</div>}
            </div>
          </div>

          <button type="submit" id="submit-button" disabled={isLoading || !stripe}>
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Processing...
              </>
            ) : (
              <>
                <i className="fa-solid fa-lock"></i>
                Pay $50.00
              </>
            )}
          </button>

          {message && (
            <div 
              id="payment-message" 
              className={message.includes("Succeeded") || message.includes("successful") ? "success" : ""}
            >
              {message}
            </div>
          )}

          <div className="security-badge">
            <i className="fa-solid fa-shield-check"></i>
            Secure payment processed by Stripe
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SecurePayment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}