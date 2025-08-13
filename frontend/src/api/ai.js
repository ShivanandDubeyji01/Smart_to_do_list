import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api/ai/";

export async function getAITaskSuggestions(title, description, token) {
  return axios.post(`${BASE_URL}smart-task/`, 
    { title, description }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
