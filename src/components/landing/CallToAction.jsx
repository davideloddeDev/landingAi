import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/CallToAction.css';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Pronto a Creare il Tuo Sito Web?</h2>
        <p>Inizia ora e trasforma la tua idea in realtà con l'aiuto dell'intelligenza artificiale</p>
        <button className="btn-primary" onClick={() => navigate('/register')}>Inizia Gratuitamente</button>
      </div>
    </section>
  );
};

export default CallToAction;
