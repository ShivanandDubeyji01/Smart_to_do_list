// src/api/auth.js
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api/";

export async function login(username, password) {
    // alert("Logging in...");
  return axios.post(`${BASE_URL}token/`, { username, password });
}

export async function register(username, email, password, password2) {
  return axios.post(`${BASE_URL}register/`, {
    username, email, password, password2
  });
}
