import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Get tasks with filters
export const getTasks = (filters = {}) => {
  return axios.get(API_URL, { params: filters });
};

// Add a new task
export const addTask = (task) => {
  return axios.post(API_URL, task);
};

// Edit a task
export const updateTask = (id, task) => {
  return axios.patch(`${API_URL}/${id}`, task);
};

// Delete a task
export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
