import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';import { loginUser } from '../../services/auth';
import '../../css/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get('plan');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Bentornato!</h2>
          <p className="auth-subtitle">Accedi al tuo account</p>
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

          <button type="submit" className="auth-button">
            Accedi
          </button>
        </form>

        <div className="auth-footer">
          <p>Non hai un account?</p>
          <button 
            className="auth-link" 
            onClick={() => navigate(`/register${selectedPlan ? `?plan=${selectedPlan}` : ''}`)}
          >
            Registrati
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;