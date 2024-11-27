import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Expense Report" },
  },
  scales: {
    x: {
      type: "category",
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      title: {
        display: true,
        text: "Amount",
      },
      beginAtZero: true,
    },
  },
};

type Report = {
  category: string;
  amount: number;
  date: string;
};

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchDefaultReports();
  }, []);

  const fetchDefaultReports = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error("Failed to fetch reports");
      const data = await response.json();
      setReports(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, category }),
      });
      if (!response.ok) throw new Error("Failed to generate report");
      const data = await response.json();
      setReports(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: reports.map((report) => new Date(report.date).toLocaleDateString()),
    datasets: [
      {
        label: "Amount",
        data: reports.map((report) => report.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Curved lines
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Generate Reports
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <div className="flex space-x-4">
          <input
            type="date"
            className="border p-2 rounded w-1/3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded w-1/3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <select
            className="border p-2 rounded w-1/3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
          </select>
        </div>
        <button
          className="bg-indigo-600 text-white p-2 rounded mt-4 w-full"
          onClick={generateReport}
        >
          Generate Report
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 shadow rounded">
        {loading ? (
          <div>Loading...</div>
        ) : reports.length === 0 ? (
          <div>No data available</div>
        ) : (
          <Line options={options} data={chartData} />
        )}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default ReportsPage;
