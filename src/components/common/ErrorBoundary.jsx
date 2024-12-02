import React, { Component } from 'react';
import '../../css/ErrorBoundary.css';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Ops! Qualcosa è andato storto</h2>
          <p>Riprova tra qualche istante</p>
          <button 
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Ricarica la pagina
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
