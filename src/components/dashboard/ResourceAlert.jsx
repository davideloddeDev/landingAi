import React from 'react';
import '../../css/ResourceAlert.css';

const ResourceAlert = ({ resource, percentage, onDismiss }) => {
  const getAlertType = (percentage) => {
    if (percentage >= 90) return 'critical';
    if (percentage >= 75) return 'warning';
    return 'info';
  };

  return (
    <div className={`resource-alert ${getAlertType(percentage)}`}>
      <span className="alert-icon">⚠️</span>
      <div className="alert-content">
        <h4>{resource}</h4>
        <p>
          {percentage >= 90 
            ? `Hai raggiunto il ${percentage}% del limite. Considera un upgrade del piano.`
            : `Hai utilizzato il ${percentage}% del limite disponibile.`}
        </p>
      </div>
      <button 
        className="alert-dismiss" 
        onClick={() => onDismiss(resource)}
      >
        ×
      </button>
    </div>
  );
};

export default ResourceAlert;
