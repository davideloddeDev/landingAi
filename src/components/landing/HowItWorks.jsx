
import React from 'react';
import '../../css/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>Come Funziona</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Descrivi il tuo progetto</h3>
          <p>Racconta la tua idea e il tipo di sito web che desideri</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>L'AI genera il sito</h3>
          <p>La nostra intelligenza artificiale crea il sito web su misura</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Scarica il codice</h3>
          <p>Ricevi il codice completo del tuo nuovo sito web</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
