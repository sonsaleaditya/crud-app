import React, { useState, useEffect } from 'react';
import '../styles/AlertBadge.css';

function AlertBadge({ type, message }) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setVisible(true);
    
    if (type === 'success' || type === 'info') {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, type]);

  if (!message || !visible) return null;

  return (
    <div className={`alert-badge alert-${type}`}>
      <span className="alert-icon">
        {type === 'success' && '✓'}
        {type === 'error' && '⚠'}
        {type === 'warning' && '!'}
        {type === 'info' && 'i'}
      </span>
      <span className="alert-message">{message}</span>
      <button 
        className="alert-close"
        onClick={() => setVisible(false)}
        aria-label="Close alert"
      >
        ×
      </button>
    </div>
  );
}

export default AlertBadge;