// src/models/task.js
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/tasks/";

export function getTasks(token) {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
}

export function createTask(task, token) {
  return axios.post(API_URL, task, { headers: { Authorization: `Bearer ${token}` } });
}

export function updateTask(id, task, token) {
  return axios.patch(`${API_URL}${id}/`, task, { headers: { Authorization: `Bearer ${token}` } });
}

export function deleteTask(id, token) {
  return axios.delete(`${API_URL}${id}/`, { headers: { Authorization: `Bearer ${token}` } });
}
