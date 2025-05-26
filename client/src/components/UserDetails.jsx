import React from 'react';
import '../styles/UserDetails.css';

function UserDetails({ user }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!user) {
    return <div className="user-details-error">User information not available</div>;
  }

  return (
    <div className="user-details">
      <div className="user-avatar">
        <div className="user-initials">
          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
      </div>
      
      <div className="user-info-container">
        <div className="user-info-item">
          <span className="info-label">ID:</span>
          <span className="info-value id-value">{user.id || 'N/A'}</span>
        </div>
        
        <div className="user-info-item">
          <span className="info-label">Name:</span>
          <span className="info-value">{user.name || 'N/A'}</span>
        </div>
        
        <div className="user-info-item">
          <span className="info-label">Email:</span>
          <span className="info-value">{user.email || 'N/A'}</span>
        </div>
        
        <div className="user-info-item">
          <span className="info-label">Created:</span>
          <span className="info-value">{formatDate(user.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;