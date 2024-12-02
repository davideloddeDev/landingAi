import React from 'react';
import '../../css/ResourceUsage.css';

const ResourceUsage = ({ resources }) => {
  return (
    <div className="resource-usage-card">
      <h3>Utilizzo Risorse</h3>
      <div className="resources-grid">
        {Object.entries(resources).map(([resource, usage]) => (
          <div key={resource} className="resource-item">
            <div className="resource-header">
              <span className="resource-name">{resource}</span>
              <span className="resource-percentage">
                {Math.round((usage.used / usage.total) * 100)}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(usage.used / usage.total) * 100}%` }}
              />
            </div>
            <div className="resource-details">
              <span>{usage.used} / {usage.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceUsage;
