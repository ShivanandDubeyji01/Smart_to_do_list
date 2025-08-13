import { useState } from "react";

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    await onRegister(form, setError, setSuccess);
  }

  return (
    <form className="bg-gray-800 p-6 rounded-2xl shadow w-full mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-green-400 text-center mb-2">Register</h2>
      <div>
        <label className="block font-medium mb-1 text-gray-200">Username</label>
        <input name="username" type="text"
          className="border rounded w-full p-2 bg-gray-900 text-white"
          value={form.username} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium mb-1 text-gray-200">Email</label>
        <input name="email" type="email"
          className="border rounded w-full p-2 bg-gray-900 text-white"
          value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium mb-1 text-gray-200">Password</label>
        <input name="password" type="password"
          className="border rounded w-full p-2 bg-gray-900 text-white"
          value={form.password} onChange={handleChange} required />
      </div>
      <div>
        <label className="block font-medium mb-1 text-gray-200">Repeat Password</label>
        <input name="password2" type="password"
          className="border rounded w-full p-2 bg-gray-900 text-white"
          value={form.password2} onChange={handleChange} required />
      </div>
      {error && <div className="text-red-400 text-center">{error}</div>}
      {success && <div className="text-green-400 text-center">{success}</div>}
      <button type="submit"
        className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 w-full font-semibold transition">
        Register
      </button>
    </form>
  );
}
