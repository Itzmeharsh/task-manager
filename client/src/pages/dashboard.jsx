import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    // ✅ VALIDATION FIX
    if (!title.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { status: "completed" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">🚀 Task Manager</h1>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:opacity-80"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="flex gap-3 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-500"
          placeholder="Enter new task..."
        />

        <button
          onClick={addTask}
          disabled={loading}
          className="bg-blue-500 px-6 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Tasks */}
      <div className="grid gap-4">
        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks yet</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-xl flex justify-between items-center border border-white/10"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-300 capitalize">
                {task.status}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => completeTask(task.id)}
                className="bg-green-500 px-3 py-1 rounded-lg text-sm hover:opacity-80"
              >
                Done
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:opacity-80"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}