import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const completeTask = async (id) => {
    await API.put(`/tasks/${id}`, { status: "completed" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
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
          className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20"
          placeholder="Enter new task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 px-6 rounded-lg hover:opacity-90"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-xl flex justify-between items-center border border-white/10"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-300">{task.status}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => completeTask(task.id)}
                className="bg-green-500 px-3 py-1 rounded-lg text-sm"
              >
                Done
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 px-3 py-1 rounded-lg text-sm"
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