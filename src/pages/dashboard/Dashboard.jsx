import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { getSubscriptionStatus } from '../../services/subscription';
import Loading from '../../components/common/Loading';
import ResourceUsage from '../../components/dashboard/ResourceUsage';
import '../../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [subscription, setSubscription] = useState(null);
  const [resources, setResources] = useState({
    'Progetti': { used: 3, total: 5 },
    'Spazio Storage': { used: 2.5, total: 5 },
    'Export mensili': { used: 8, total: 20 },
    'Crediti AI': { used: 150, total: 500 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscriptionData = await getSubscriptionStatus(user.uid);
        setSubscription(subscriptionData);
      } catch (error) {
        console.error('Errore nel caricamento dell\'abbonamento:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user.uid]);

  const getResourceAlerts = () => {
    return Object.entries(resources).map(([resource, usage]) => {
      const percentage = Math.round((usage.used / usage.total) * 100);
      if (percentage >= 75) {
        return (
          <ResourceAlert 
            key={resource}
            resource={resource}
            percentage={percentage}
          />
        );
      }
      return null;
    }).filter(Boolean);
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button 
          className="control-panel-button"
          onClick={() => navigate('/settings')}
        >
          Pannello di Controllo
        </button>
      </header>

      <div className="dashboard-content">
        {getResourceAlerts()}
        <div className="plan-info-card">
          <h2>Il Tuo Piano</h2>
          <div className="plan-details">
            <span className="plan-badge">{subscription.plan}</span>
            <p className="plan-status">{subscription.status}</p>
          </div>
          <div className="plan-info">
            <p>Attivato il: {new Date(subscription.createdAt).toLocaleDateString()}</p>
            <p>Ultimo aggiornamento: {new Date(subscription.updatedAt).toLocaleDateString()}</p>
          </div>
          <ul className="plan-features">
            {subscription.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <ResourceUsage resources={resources} />
      </div>
    </div>
  );
};
export default Dashboard;