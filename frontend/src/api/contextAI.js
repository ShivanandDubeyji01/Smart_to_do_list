// src/api/contextAI.js
import axios from 'axios';

const BASE = 'http://127.0.0.1:8000/api/ai';

export async function analyzeContext(context, tasks, token) {
  return axios.post(
    `${BASE}/context-analysis/`,
    { context, tasks },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
