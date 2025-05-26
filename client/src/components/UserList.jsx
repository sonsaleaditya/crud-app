import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../api';
import UserItem from './UserItem';
import LoadingSpinner from './LoadingSpinner';
import AlertBadge from './AlertBadge';
import Modal from './Modal';
import '../styles/UserList.css';

function UserList({ refreshTrigger, onUserSelect, onEditClick, onUserDeleted }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, userId: null });

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await getAllUsers(); // response = { success, data }
    setUsers(response.data);               // set to inner array
  } catch (err) {
    console.error('Error fetching users:', err);
    setError('Failed to load users. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  const handleDeleteClick = (userId) => {
    setDeleteConfirmation({ open: true, userId });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(deleteConfirmation.userId);
      setUsers(users.filter(user => user.id !== deleteConfirmation.userId));
      if (onUserDeleted) onUserDeleted();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again later.');
    } finally {
      setLoading(false);
      setDeleteConfirmation({ open: false, userId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, userId: null });
  };

  if (loading && !users.length) {
    return (
      <div className="user-list-loading">
        <LoadingSpinner />
        <p>Loading users...</p>
      </div>
    );
  }

  if (error && !users.length) {
    return <AlertBadge type="error" message={error} />;
  }

  if (!users.length) {
    return <div className="no-users-message">No users found. Create a new user to get started.</div>;
  }

  return (
    <div className="user-list-container">
      {error && <AlertBadge type="error" message={error} />}
      {loading && <div className="overlay-loading"><LoadingSpinner /></div>}
      
      <div className="user-list">
        <div className="user-list-header">
          <span className="column-id">ID</span>
          <span className="column-name">Name</span>
          <span className="column-email">Email</span>
          <span className="column-created">Created</span>
          <span className="column-actions">Actions</span>
        </div>
        
        {users.map(user => (
          <UserItem 
            key={user.id} 
            user={user} 
            onSelect={() => onUserSelect(user)}
            onEdit={() => onEditClick(user)}
            onDelete={() => handleDeleteClick(user.id)}
          />
        ))}
      </div>
      
      <Modal 
        isOpen={deleteConfirmation.open}
        onClose={cancelDelete}
        title="Confirm Deletion"
      >
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          <div className="modal-actions">
            <button className="button button-secondary" onClick={cancelDelete}>Cancel</button>
            <button className="button button-danger" onClick={confirmDelete}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserList;