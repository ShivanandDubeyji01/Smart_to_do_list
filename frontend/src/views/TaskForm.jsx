import { useState, useEffect } from 'react';
import { getAITaskSuggestions } from '../api/ai';

// Helper functions
function formatDueDate(dateStr) {
  if (!dateStr) return "";
  return dateStr.slice(0, 16);
}

function addDaysToDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 16);
}

export default function TaskForm({ onSubmit, editTaskData, onCancelEdit }) {
  const emptyForm = { title: '', description: '', due_date: '', priority: 1, completed: false };
  const [form, setForm] = useState(emptyForm);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  useEffect(() => {
    if (editTaskData) {
      setForm({
        ...editTaskData,
        due_date: formatDueDate(editTaskData.due_date)
      });
    } else {
      setForm(emptyForm);
    }
  }, [editTaskData]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function getAISuggestions() {
    if (!form.title.trim()) {
      alert('Please enter a task title first!');
      return;
    }

    setAiLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await getAITaskSuggestions(form.title, form.description, token);
      
      if (response.data.success) {
        const suggestions = response.data.ai_suggestions;
        setAiSuggestions(suggestions);
        
        // Auto-apply AI suggestions to form
        setForm(f => ({
          ...f,
          priority: suggestions.priority,
          description: suggestions.enhanced_description,
          due_date: suggestions.suggested_due_days ? addDaysToDate(suggestions.suggested_due_days) : f.due_date
        }));
      } else {
        alert('AI suggestions failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('AI Error:', error);
      alert('Failed to get AI suggestions. Please try again.');
    } finally {
      setAiLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form, !!editTaskData);
    setForm(emptyForm);
    setAiSuggestions(null);
  }

  return (
    <form className="bg-gray-800 border border-gray-700 p-6 mb-8 rounded-2xl shadow w-full" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-300">
          {editTaskData ? "Edit Task" : "Add New Task"}
        </h2>
        <button
          type="button"
          onClick={getAISuggestions}
          disabled={aiLoading}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50"
        >
          {aiLoading ? '🤖 Thinking...' : '✨ Get AI Suggestions'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-200">Title</label>
          <input name="title" className="border p-2 w-full rounded bg-gray-900 text-white" 
            value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-200">Priority</label>
          <input name="priority" type="number" min="1" max="5" 
            className="border p-2 w-full rounded bg-gray-900 text-white"
            value={form.priority} onChange={handleChange} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-semibold mb-1 text-gray-200">Description</label>
        <textarea name="description" 
          className="border p-2 w-full rounded bg-gray-900 text-white h-20" 
          value={form.description} onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="block font-semibold mb-1 text-gray-200">Due Date</label>
        <input name="due_date" type="datetime-local" 
          className="border p-2 w-full rounded bg-gray-900 text-white"
          value={form.due_date} onChange={handleChange} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
        <label className="text-gray-200 font-medium">Completed</label>
      </div>

      {/* AI Suggestions Display */}
      {aiSuggestions && (
        <div className="mt-4 p-4 bg-purple-900/50 rounded-lg border border-purple-600">
          <h4 className="text-purple-300 font-semibold mb-2">🤖 AI Insights:</h4>
          <p className="text-purple-200 text-sm mb-2">{aiSuggestions.reasoning}</p>
          <p className="text-purple-200 text-xs">Category: <span className="font-semibold">{aiSuggestions.category}</span></p>
          {aiSuggestions.subtasks && aiSuggestions.subtasks.length > 0 && (
            <div className="mt-3">
              <p className="text-purple-300 text-sm font-semibold mb-1">Suggested Subtasks:</p>
              <ul className="text-purple-200 text-xs space-y-1">
                {aiSuggestions.subtasks.map((subtask, index) => (
                  <li key={index}>• {subtask}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-6">
        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition" type="submit">
          {editTaskData ? "Update Task" : "Add Task"}
        </button>
        {editTaskData && (
          <button type="button" onClick={onCancelEdit}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
