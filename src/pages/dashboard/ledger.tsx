import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const LedgerPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <Navbar />
          <h1 className="text-3xl font-bold">Ledger</h1>
          {/* Form or components for adding ledger */}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default LedgerPage;
