
import React from 'react';
import '../../css/Features.css';

const Features = () => {
  return (
    <section className="features">
      <h2>Caratteristiche Principali</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Design Personalizzato</h3>
          <p>Design unico creato su misura per il tuo business</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Velocità</h3>
          <p>Sito web pronto in pochi minuti</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Responsive</h3>
          <p>Perfetto su tutti i dispositivi</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>SEO Ottimizzato</h3>
          <p>Massima visibilità sui motori di ricerca</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
