import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Modal from './components/Modal';
import './styles/App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(0);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUserCreated = () => {
    setRefreshUsers(prev => prev + 1);
  };

  const handleUserUpdated = () => {
    setRefreshUsers(prev => prev + 1);
    setIsEditModalOpen(false);
  };

  const handleUserDeleted = () => {
    setRefreshUsers(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Management System</h1>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Create New User</h2>
          <UserForm onUserCreated={handleUserCreated} />
        </section>
        
        <section className="list-section">
          <h2>User List</h2>
          <UserList 
            refreshTrigger={refreshUsers}
            onUserSelect={handleUserSelect}
            onEditClick={handleEditClick}
            onUserDeleted={handleUserDeleted}
          />
        </section>
      </main>

      <Modal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)}
        title="User Details"
      >
        {selectedUser && (
          <UserDetails user={selectedUser} />
        )}
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        {selectedUser && (
          <UserForm 
            user={selectedUser}
            isEditMode={true}
            onUserUpdated={handleUserUpdated}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      <footer className="app-footer">
        <p>&copy; 2025 User Management System</p>
      </footer>
    </div>
  );
}

export default App;