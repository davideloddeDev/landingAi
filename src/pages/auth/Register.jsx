import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { registerUser } from '../../services/auth';
import '../../css/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'free';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono');
      return;
    }
    try {
      await registerUser(formData.email, formData.password, selectedPlan);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Benvenuto!</h2>
          <p className="auth-subtitle">Crea il tuo account per iniziare</p>
        </div>
        
        <div className="plan-badge">
          Piano selezionato: <span>{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</span>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Conferma Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Crea Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Hai già un account?</p>
          <button 
            className="auth-link" 
            onClick={() => navigate(`/login?plan=${selectedPlan}`)}
          >
            Accedi
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;