import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1/users';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create user
export const createUser = async (data) => {
  const response = await api.post('/create', data);
  return response.data;
};

// Get all users
export const getAllUsers = async () => {
  const response = await api.get('/get-all');
  console.log(response.data);
  return response.data;
};

// Get one user by id
export const getUserById = async (id) => {
  const response = await api.get(`/get-one/${id}`);
  return response.data;
};

// Update user by id
export const updateUser = async (id, data) => {
  const response = await api.put(`/update/${id}`, data);
  return response.data;
};

// Delete user by id
export const deleteUser = async (id) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};
