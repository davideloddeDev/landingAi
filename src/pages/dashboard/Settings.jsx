import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { logoutUser, deleteAccount } from '../../services/auth';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loading from '../../components/common/Loading';
import Notification from '../../components/common/Notification';
import RetryIndicator from '../../components/common/RetryIndicator';
import '../../css/Settings.css';

const MAX_RETRIES = 3;

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [retryCount, setRetryCount] = useState({});
  const [isRetrying, setIsRetrying] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleError = (action, error) => {
    const errorMessages = {
      logout: 'Impossibile effettuare il logout. Riprova più tardi.',
      delete: 'Impossibile eliminare l\'account. Verifica di aver effettuato l\'accesso di recente.',
      upgrade: 'Impossibile aggiornare il piano. Verifica la tua connessione.',
      cancel: 'Impossibile disdire l\'abbonamento. Contatta il supporto.'
    };

    setNotification({
      type: 'error',
      message: errorMessages[action] || error.message
    });
  };

  const retry = async (action, handler) => {
    const currentRetries = retryCount[action] || 0;
    
    if (currentRetries >= MAX_RETRIES) {
      setNotification({
        type: 'error',
        message: `Troppi tentativi falliti. Riprova più tardi.`
      });
      return;
    }

    setIsRetrying(true);
    setCurrentAction(action);
    setRetryCount(prev => ({
      ...prev,
      [action]: currentRetries + 1
    }));

    try {
      await handler();
      setRetryCount(prev => ({ ...prev, [action]: 0 }));
    } catch (error) {
      handleError(action, error);
      setNotification({
        type: 'error',
        message: `Tentativo ${currentRetries + 1}/${MAX_RETRIES} fallito. Riprovo...`
      });
      setTimeout(() => retry(action, handler), 1000);
    } finally {
      setIsRetrying(false);
      setCurrentAction(null);
    }
  };

  const handleActionWithRetry = (action, handler) => {
    return async () => {
      try {
        await handler();
      } catch (error) {
        retry(action, handler);
      }
    };
  };

  const handleLogout = handleActionWithRetry('logout', async () => {
    await logoutUser();
    setNotification({
      type: 'success',
      message: 'Logout effettuato con successo'
    });
    setTimeout(() => navigate('/'), 2000);
  });

  const handleDeleteAccount = handleActionWithRetry('delete', async () => {
    setIsDeleting(true);
    await deleteAccount();
    setNotification({
      type: 'success',
      message: 'Account eliminato con successo'
    });
    setTimeout(() => navigate('/'), 2000);
  });

  const handleUpgrade = async () => {
    try {
      // Logica per l'upgrade
      setNotification({
        type: 'success',
        message: 'Piano aggiornato con successo'
      });
      setTimeout(() => navigate('/pricing'), 1500);
    } catch (error) {
      handleError('upgrade', error);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      // Logica per la disdetta
      setNotification({
        type: 'success',
        message: 'Abbonamento disdetto con successo'
      });
    } catch (error) {
      handleError('cancel', error);
    }
  };

  if (isDeleting) {
    return <Loading message="Eliminazione account in corso..." />;
  }

  return (
    <div className="settings-container">
      <header className="settings-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← Dashboard
        </button>
        <h1>Pannello di Controllo</h1>
      </header>

      {isRetrying && (
        <div className="retry-container">
          <Loading message="Nuovo tentativo in corso..." />
          <RetryIndicator 
            currentRetry={retryCount[currentAction] || 0}
            maxRetries={MAX_RETRIES}
          />
        </div>
      )}

      <div className="settings-content">
        <div className="settings-card">
          <h2>Piano Attuale</h2>
          <div className="subscription-controls">
            <button className="upgrade-button" onClick={handleUpgrade}>
              Aggiorna Piano
            </button>
            <button className="cancel-button" onClick={handleCancelSubscription}>
              Disdici Abbonamento
            </button>
          </div>
        </div>

        <div className="settings-card danger-zone">
          <h2>Zona Pericolosa</h2>
          <div className="danger-actions">
            <button 
              className="delete-button"
              onClick={() => setShowDeleteModal(true)}
            >
              Elimina Account
            </button>
            <button 
              className="logout-button" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Elimina Account"
        message="Sei sicuro di voler eliminare il tuo account? Questa azione non può essere annullata."
      />
    </div>
  );
};
export default Settings;