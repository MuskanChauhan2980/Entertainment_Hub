import React, { useEffect, useState } from "react";
import "./permium.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51SBQQ98IVPARgywefJsHkBDg53L7dfCBbXzZ6uUU68Ht8s2gKu16VyuJdSRED3jtyZMfbHzS5hn7gmJZdOZr6txH00rgCfdMud"); // ⚠️ Replace with your actual key

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("test@example.com");
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
        } else {
          setMessage(`Payment status unexpected: ${paymentIntent.status}`);
        }
      } else if (data.success) {
        setMessage("Payment Succeeded! Thank you for your purchase.");
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
    <div className="container">
      <h1>REDKNOT_CASA Purchase ($50.00)</h1>

      <form id="secure-payment-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="name-input">Full Name</label>
          <input
            type="text"
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="email-input">Email Address</label>
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="card-details-section">
          <h2>Payment Information</h2>
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
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                  },
                },
              }}
            />
            {cardError && <div id="card-errors">{cardError}</div>}
          </div>
        </div>

        <button type="submit" id="submit-button" disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay $50.00"}
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
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
