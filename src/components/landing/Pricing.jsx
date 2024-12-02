import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Pricing.css';

const Pricing = ({ isLaunchOffer = true }) => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Base',
      originalPrice: '€29',
      price: isLaunchOffer ? '€0' : '€29',
      features: ['1 Pagina', 'Design Responsive', 'Export HTML/CSS', 'Supporto Email'],
      isPopular: false
    },
    {
      name: 'Pro',
      originalPrice: '€79',
      price: isLaunchOffer ? '€0' : '€79',
      features: ['5 Pagine', 'Design Responsive', 'Export HTML/CSS/JS', 'Supporto Prioritario', 'SEO Optimization'],
      isPopular: true
    },
    {
      name: 'Business',
      originalPrice: '€149',
      price: isLaunchOffer ? '€0' : '€149',
      features: ['10 Pagine', 'Design Responsive', 'Export Completo', 'Supporto 24/7', 'SEO Optimization', 'Analytics Avanzate'],
      isPopular: false
    }
  ];

  return (
    <section className="pricing">
      <h2>Piani e Prezzi</h2>
      {isLaunchOffer && (
        <div className="pricing-banner">🚀 Offerta Lancio - Tutti i piani gratuiti per tempo limitato</div>
      )}
      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}>
            {plan.isPopular && <div className="popular-badge">Più Scelto</div>}
            <h3>{plan.name}</h3>
            <div className="price-container">
              {isLaunchOffer && <span className="original-price">{plan.originalPrice}</span>}
              <span className="price">{plan.price}</span>
            </div>
            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button 
              className="btn-primary" 
              onClick={() => navigate(`/register?plan=${plan.name.toLowerCase()}`)}
            >
              {isLaunchOffer ? 'Inizia Gratis' : 'Scegli Piano'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;