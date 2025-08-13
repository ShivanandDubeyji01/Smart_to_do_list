import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import useTaskController from "./controllers/TaskController";
import TaskList from "./views/TaskList";
import TaskForm from "./views/TaskForm";
import ContextInput from './views/ContextInput';
import { login, register } from "./api/auth";

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [editTaskData, setEditTaskData] = useState(null);
  const { tasks, loading, addTask, editTask, removeTask } = useTaskController(token);

  async function handleLogin(username, password, setError) {
    try {
      const res = await login(username, password);
      setToken(res.data.access);
      localStorage.setItem('access_token', res.data.access);
      setEditTaskData(null);
      setError('');
    } catch {
      setError("Invalid credentials");
    }
  }

  async function handleRegister(form, setError, setSuccess) {
    try {
      await register(form.username, form.email, form.password, form.password2);
      setSuccess("Registration successful! Please login.");
      setError('');
      setShowRegister(false);
    } catch {
      setError("Registration failed.");
      setSuccess('');
    }
  }

  async function handleFormSubmit(data, isEdit) {
    if (isEdit) {
      await editTask(data.id, data);
      setEditTaskData(null);
    } else {
      await addTask(data);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <div className="min-h-screen bg-black py-12 px-4">
                <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-3xl shadow-2xl p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                      <span>🚀</span> Smart To-do Dashboard
                    </h1>
                    <div className="flex gap-4">
                      <a href="/context" className="text-purple-400 underline">Context</a>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
                        onClick={() => {
                          setToken(null);
                          localStorage.removeItem('access_token');
                          setEditTaskData(null);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <TaskForm
                    onSubmit={handleFormSubmit}
                    editTaskData={editTaskData}
                    onCancelEdit={() => setEditTaskData(null)}
                  />
                  {loading
                    ? <div className="p-8 text-center text-gray-400">Loading tasks...</div>
                    : <TaskList tasks={tasks} onEdit={setEditTaskData} onDelete={removeTask} />}
                </div>
              </div>
            ) : (
              <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="max-w-md w-full bg-gray-900 p-8 rounded-3xl shadow-2xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
                    alt="To-do Logo"
                    className="mx-auto mb-6 w-16 h-16"
                  />
                  {showRegister
                    ? <RegisterForm onRegister={handleRegister} />
                    : <LoginForm onLogin={handleLogin} />}
                  <button
                    className="text-blue-400 font-semibold underline mt-6"
                    onClick={() => setShowRegister(!showRegister)}
                  >
                    {showRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                  </button>
                </div>
              </div>
            )
          }
        />
        <Route path="/context" element={<ContextInput />} />
      </Routes>
    </BrowserRouter>
  );
}
