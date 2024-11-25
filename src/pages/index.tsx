// src/pages/index.tsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../../src/components/ProtectedRoute";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProtectedRoute>
        <div>Welcome to the Dashboard!</div>
      </ProtectedRoute>
    </div>
  );
}
