import { NextApiRequest, NextApiResponse } from "next";

// Mock data (replace with actual DB logic)
const mockData = [
  { category: "Food", amount: 120, date: "2024-11-01" },
  { category: "Transport", amount: 80, date: "2024-11-02" },
  { category: "Utilities", amount: 50, date: "2024-11-03" },
  { category: "Food", amount: 150, date: "2024-11-05" }, // Added extra data for testing
  { category: "Transport", amount: 90, date: "2024-11-06" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET and POST requests
  if (req.method === "GET") {
    // Return all reports on GET request
    res.status(200).json(mockData);
  } else if (req.method === "POST") {
    // Handle custom report generation via POST request
    const { startDate, endDate, category } = req.body;

    // Validate required fields
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required" });
    }

    // Filter the mock data based on the provided dates and optional category
    const filteredData = mockData.filter((entry) => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if the entry falls within the date range and matches the category (if specified)
      return (
        entryDate >= start &&
        entryDate <= end &&
        (!category || entry.category === category) // Filter by category if provided
      );
    });

    // Return the filtered data
    res.status(200).json(filteredData);
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
