import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Navbar />
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-gray-100 border rounded">
            <h2 className="font-bold">Add Expense</h2>
            <p>Placeholder for add expense functionality.</p>
          </div>
          <div className="p-4 bg-gray-100 border rounded">
            <h2 className="font-bold">View Ledger</h2>
            <p>Placeholder for view ledger functionality.</p>
          </div>
          <div className="p-4 bg-gray-100 border rounded">
            <h2 className="font-bold">Generate Report</h2>
            <p>Placeholder for generate report functionality.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
