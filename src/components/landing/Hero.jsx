
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Crea il Tuo Sito Web con l'AI</h1>
        <p className="hero-subtitle">
          Descrivi il tuo progetto e lascia che l'intelligenza artificiale crei il sito web perfetto per te
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => navigate('/register')}>Inizia Ora</button>
          <button className="btn-secondary" onClick={() => navigate('/how-it-works')}>Scopri di più</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/hero-image.png" alt="AI Website Generator" />
      </div>
    </section>
  );
};

export default Hero;