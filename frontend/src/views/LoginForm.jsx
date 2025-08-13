import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // updates state when typing
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // submit handler
  async function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    setError('');
    await onLogin(form.username, form.password, setError); // calls App.jsx function
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}
