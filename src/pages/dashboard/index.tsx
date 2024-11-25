import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <Navbar />
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          {/* Additional dashboard content */}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
