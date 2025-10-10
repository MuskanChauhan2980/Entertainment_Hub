import React from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css";

const plans = [
  {
    title: "Monthly Plan",
      img:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    price: "$25",
    discountedPrice: "$20",
    duration: "1 Month",
    benefits: [
      "Access to all premium DJs",
      "Exclusive events",
      "VIP support",
    ],
  },
  {
    title: "6-Month Plan",
       img:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    price: "$120",
    discountedPrice: "$100",
    duration: "6 Months",
    benefits: [
      "All Monthly Plan benefits",
      "Special discounts on events",
      "Early access to new features",
    ],
  },
  {
    title: "Yearly Plan",
    img:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    price: "$220",
    discountedPrice: "$180",
    duration: "12 Months",
    benefits: [
      "All 6-Month Plan benefits",
      "Exclusive premium badge",
      "Free VIP guestlist for 2 events",
    ],
  },
];

export default function PremiumPage() {
  const navigate = useNavigate();

  return (
    <div className="premium-page">
      <h2>🌟 Choose Your Premium Plan</h2>

      <div className="plans-container">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <img src={plan.img} alt={plan.title} />
            <h3>{plan.title}</h3>
            <p className="duration">{plan.duration}</p>
            <p className="price">
              <span className="original-price">{plan.price}</span>{" "}
              <span className="discounted-price">{plan.discountedPrice}</span>
            </p>
            <ul className="benefits">
              {plan.benefits.map((benefit, i) => (
                <li key={i}>✅ {benefit}</li>
              ))}
            </ul>
            <button onClick={() => alert(`Proceed to payment for ${plan.title}`)}>
              Subscribe
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}

