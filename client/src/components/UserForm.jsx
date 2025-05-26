import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api';
import AlertBadge from './AlertBadge';
import '../styles/UserForm.css';

function UserForm({ user, isEditMode = false, onUserCreated, onUserUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && isEditMode) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user, isEditMode]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setAlert({ type: '', message: '' });

    try {
      if (isEditMode) {
        await updateUser(user.id, formData);
        setAlert({ type: 'success', message: 'User updated successfully!' });
        if (onUserUpdated) onUserUpdated();
      } else {
        await createUser(formData);
        setAlert({ type: 'success', message: 'User created successfully!' });
        setFormData({ name: '', email: '' });
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({ 
        type: 'error', 
        message: error.message || 'An error occurred while processing your request.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-form-container">
      {alert.type && (
        <AlertBadge type={alert.type} message={alert.message} />
      )}
      
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-actions">
          {isEditMode && (
            <button 
              type="button" 
              className="button button-secondary" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          
          <button 
            type="submit" 
            className="button button-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : isEditMode ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;