import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../models/task";

export default function useTaskController(token) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getTasks(token).then(res => setTasks(res.data)).finally(() => setLoading(false));
    }
  }, [token]);

  const addTask = (task) => createTask(task, token).then(res => setTasks([...tasks, res.data]));
  const editTask = (id, task) => updateTask(id, task, token).then(res => setTasks(tasks.map(t => (t.id === id ? res.data : t))));
  const removeTask = (id) => deleteTask(id, token).then(() => setTasks(tasks.filter(t => t.id !== id)));

  return { tasks, loading, addTask, editTask, removeTask };
}
