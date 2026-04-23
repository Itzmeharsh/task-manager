import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/login";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}