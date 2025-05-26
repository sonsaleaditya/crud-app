import React from 'react';
import '../styles/UserItem.css';

function UserItem({ user, onSelect, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="user-item" onClick={onSelect}>
     <span className="column-id" title={user.id}>
  {user.id ? user.id.toString().substring(0, 8) + '...' : 'N/A'}
</span>

      <span className="column-name">{user.name || 'N/A'}</span>
      <span className="column-email">{user.email || 'N/A'}</span>
      <span className="column-created">{formatDate(user.created_at)}</span>
      <div className="column-actions" onClick={(e) => e.stopPropagation()}>
        <button 
          className="button button-icon button-edit" 
          onClick={onEdit}
          aria-label="Edit user"
        >
          <span className="button-icon-inner">✎</span>
        </button>
        <button 
          className="button button-icon button-delete" 
          onClick={onDelete}
          aria-label="Delete user"
        >
          <span className="button-icon-inner">×</span>
        </button>
      </div>
    </div>
  );
}

export default UserItem;