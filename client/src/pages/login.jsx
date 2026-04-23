import { useState } from "react";
import API from "../api/axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const { data } = await API.post("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        await API.post("/auth/register", {
          name,
          email,
          password,
        });

        alert("Registered! Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-96 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {!isLogin && (
          <input
            className="w-full p-3 mb-3 rounded bg-white/20 placeholder-gray-300"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full p-3 mb-3 rounded bg-white/20 placeholder-gray-300"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 rounded bg-white/20 placeholder-gray-300"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-400 ml-1 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}