import { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if no token is found
      router.push("/auth/login");
    } else {
      // Optional: Validate the token with the server
      fetch("/api/auth/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            // Token is invalid; clear storage and redirect
            localStorage.removeItem("token");
            router.push("/auth/login");
          }
        })
        .catch(() => {
          // Handle server validation errors
          localStorage.removeItem("token");
          router.push("/auth/login");
        });
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-64 p-8">
        {/* Navbar */}
        <div className="bg-white shadow-md p-4 mb-6">
          <Navbar />
        </div>

        {/* Dashboard content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="font-bold text-xl text-gray-700">Add Expense</h2>
            <p className="text-gray-500 mt-2">
              Placeholder for add expense functionality.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="font-bold text-xl text-gray-700">View Ledger</h2>
            <p className="text-gray-500 mt-2">
              Placeholder for view ledger functionality.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="font-bold text-xl text-gray-700">Generate Report</h2>
            <p className="text-gray-500 mt-2">
              Placeholder for generate report functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
