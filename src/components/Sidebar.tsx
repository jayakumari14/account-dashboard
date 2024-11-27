import Link from "next/link";

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white p-6">
    <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
    <ul>
      <li className="mb-4">
        <Link href="/auth/dashboard" className="text-blue-500 hover:underline">
          Home
        </Link>
      </li>
      <li className="mb-4">
        <Link href="/dashboard/expenses">Add Expense</Link>
      </li>
      <li className="mb-4">
        <Link href="/dashboard/ledger">View Ledger</Link>
      </li>
      <li className="mb-4">
        <Link href="/dashboard/reports">Generate Report</Link>
      </li>
      <li className="mt-8">
        <Link
          href="/auth/login"
          onClick={() => {
            localStorage.removeItem("user");
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
