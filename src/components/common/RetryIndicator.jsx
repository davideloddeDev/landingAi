import React from 'react';
import '../../css/RetryIndicator.css';

const RetryIndicator = ({ currentRetry, maxRetries }) => {
  return (
    <div className="retry-indicator">
      <div className="retry-progress">
        {Array.from({ length: maxRetries }).map((_, index) => (
          <div 
            key={index}
            className={`retry-dot ${index < currentRetry ? 'used' : ''}`}
          />
        ))}
      </div>
      <span className="retry-text">
        Tentativi rimanenti: {maxRetries - currentRetry}
      </span>
    </div>
  );
};

export default RetryIndicator;
