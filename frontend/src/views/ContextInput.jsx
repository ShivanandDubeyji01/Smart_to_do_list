// src/views/ContextInput.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { analyzeContext } from '../api/contextAI';

export default function ContextInput() {
  const [content, setContent] = useState('');
  const [source, setSource] = useState('notes');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token');

  // Fetch context history
  async function fetchHistory() {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/context/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch {
      setHistory([]);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  // Add new context
  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback('');
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/context/',
        { content, source_type: source },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedback('✅ Context entry saved!');
      setContent('');
      setSource('notes');
      fetchHistory();
    } catch (error) {
      setFeedback('❌ Failed to save: ' + error.message);
    }
  }

  // Run AI analysis
  async function handleAnalyze() {
    setLoading(true);
    setAnalysis(null);
    try {
      const taskRes = await axios.get('http://127.0.0.1:8000/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const aiRes = await analyzeContext(history, taskRes.data, token);
      if (aiRes.data.success) {
        setAnalysis(aiRes.data.analysis);
      } else {
        alert('AI Analysis failed: ' + aiRes.data.error);
      }
    } catch (err) {
      alert('Error analyzing: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black pt-8 px-4">
      
      {/* Back to Dashboard Link */}
      <Link 
        to="/" 
        className="text-blue-400 font-semibold underline mb-6 inline-block hover:text-blue-300"
      >
        ← Back to Dashboard
      </Link>

      {/* Context Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow space-y-4 w-full max-w-4xl mx-auto"
      >
        <h2 className="text-lg font-bold text-white">Add Daily Context</h2>

        <textarea
          className="w-full p-2 rounded text-white bg-gray-900 border"
          placeholder="Paste message, email, or notes..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={5}
        />

        <div>
          <label className="block text-gray-200 mb-1">Source Type:</label>
          <select
            className="border rounded bg-gray-900 text-white w-full p-2"
            value={source}
            onChange={e => setSource(e.target.value)}
          >
            <option value="notes">Notes</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </div>

        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          type="submit"
        >
          Add Context
        </button>

        {feedback && <div className="text-purple-300">{feedback}</div>}
      </form>

      {/* Analyze Context AI Button */}
      <div className="mt-6 max-w-4xl mx-auto">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          {loading ? '🤖 Analyzing...' : '✨ Analyze Context with AI'}
        </button>
      </div>

      {/* Context History */}
      <div className="mt-8 bg-gray-900 rounded-xl p-4 max-w-4xl mx-auto">
        <h3 className="text-white text-lg font-semibold mb-2">
          Context History
        </h3>
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {history.length === 0 && (
            <li className="text-gray-400">No context entries yet.</li>
          )}
          {history.map((entry, idx) => (
            <li
              key={entry.id || idx}
              className="p-3 rounded bg-gray-800 border-l-4 border-purple-600 text-gray-200"
            >
              <div className="text-xs text-gray-400">
                {entry.source_type} • {new Date(entry.timestamp).toLocaleString()}
              </div>
              <div className="mt-1">
                {entry.content.length > 300
                  ? entry.content.substring(0, 300) + '...'
                  : entry.content}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Analysis Results */}
      {analysis && (
        <div className="mt-8 p-4 bg-purple-900/40 rounded-xl border border-purple-500 max-w-4xl mx-auto">
          <h3 className="text-purple-300 text-lg font-semibold mb-2">
            🤖 AI Context Analysis
          </h3>

          <div>
            <h4 className="text-purple-200 font-semibold">New Task Suggestions:</h4>
            <ul className="list-disc ml-5 text-white">
              {analysis.new_task_suggestions.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="text-purple-200 font-semibold">Priority Updates:</h4>
            <ul className="list-disc ml-5 text-white">
              {analysis.priority_updates.map((p, i) => (
                <li key={i}>
                  {p.task_title} → Priority {p.new_priority}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="text-purple-200 font-semibold">Deadline Recommendations:</h4>
            <ul className="list-disc ml-5 text-white">
              {analysis.deadline_recommendations.map((d, i) => (
                <li key={i}>
                  {d.task_title} → {d.suggested_days} days from now
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <h4 className="text-purple-200 font-semibold">Productivity Insights:</h4>
            <ul className="list-disc ml-5 text-white">
              {analysis.productivity_insights.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
