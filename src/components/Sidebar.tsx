const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white p-6">
    <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
    <ul>
      <li className="mb-4">
        <a href="/auth/dashboard" className="text-blue-500 hover:underline">
          Home
        </a>
      </li>
      <li className="mb-4">
        <a href="/auth/dashboard/expenses">Add Expense</a>
      </li>
      <li className="mb-4">
        <a href="/auth/dashboard/ledger">View Ledger</a>
      </li>
      <li className="mb-4">
        <a href="/auth/dashboard/reports">Generate Report</a>
      </li>
      <li className="mt-8">
        <a
          href="/auth/login"
          onClick={() => {
            localStorage.removeItem("user");
          }}
        >
          Logout
        </a>
      </li>
    </ul>
  </div>
);

export default Sidebar;
