import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import AuthInitializer from "./features/auth/AuthInitializer";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/projects/Projects";

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
