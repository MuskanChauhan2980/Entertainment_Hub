 import React from "react";
import { useNavigate } from "react-router-dom";
import "./PremiumPage.css";

const plans = [
  {
    title: "Monthly Plan",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    price: "$25",
    discountedPrice: "$20",
    duration: "1 Month",
    benefits: [
      "Access to all premium DJs",
      "Exclusive events",
      "VIP support",
      "Priority booking",
      "Member-only content"
    ],
  },
   {
    title: "6-Month Plan",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    price: "$120",
    discountedPrice: "$100",
    duration: "6 Months",
    benefits: [
      "All Monthly Plan benefits",
      "Special discounts on events",
      "Early access to new features",
      "Free guestlist for 1 event",
      "Dedicated account manager"
    ],
  },
  {
    title: "Yearly Plan",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
    price: "$220",
    discountedPrice: "$180",
    duration: "12 Months",
    benefits: [
      "All 6-Month Plan benefits",
      "Exclusive premium badge",
      "Free VIP guestlist for 2 events",
      "Backstage access opportunities",
      "Lifetime discounts on future plans"
    ],
  },
  
];

const features = [
  {
    icon: "fa-crown",
    title: "Premium Access",
    description: "Unlock all exclusive content and features"
  },
  {
    icon: "fa-star",
    title: "VIP Treatment",
    description: "Get priority access and special privileges"
  },
  {
    icon: "fa-calendar",
    title: "Early Booking",
    description: "Be the first to book popular events and tables"
  },
  {
    icon: "fa-headset",
    title: "24/7 Support",
    description: "Dedicated support team available round the clock"
  }
];

export default function PremiumPage() {
  const navigate = useNavigate();

 const handleSubscribe = (plan) => {
  alert(`Proceed to payment for ${plan.title} - ${plan.discountedPrice}`);

  // Mark user as premium in localStorage
  localStorage.setItem("isPremium", "true");

  // Optional: you can save the selected plan as well
  localStorage.setItem("premiumPlan", plan.title);
};


  return (
    <div className="premium-page">
      <h2>🌟 Choose Your Premium Plan</h2>
      
      {/* Feature Highlights */}
      <div className="feature-highlights">
        <h3>Why Go Premium?</h3>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <i className={`fa-solid ${feature.icon}`}></i>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="plans-container">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <img src={plan.img} alt={plan.title} />
            <h3>{plan.title}</h3>
            <p className="duration">{plan.duration}</p>
            <div className="price">
              <span className="original-price">{plan.price}</span>{" "}
              <span className="discounted-price">{plan.discountedPrice}</span>
            </div>
            <ul className="benefits">
              {plan.benefits.map((benefit, i) => (
                <li key={i}>
                  <i className="fa-solid fa-check"></i> {benefit}
                </li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe(plan)}>
              <i className="fa-solid fa-credit-card"></i> Subscribe Now
            </button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        <i className="fa-solid fa-arrow-left"></i> Back to Home
      </button>
    </div>
  );
}