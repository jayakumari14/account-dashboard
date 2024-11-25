// src/pages/api/reports.ts
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {  startDate, endDate } = req.body;

  // Mock data for demonstration
  const mockExpenses = [
    { id: 1, name: "Rent", category: "Housing", amount: 1200, date: "2024-11-01" },
    { id: 2, name: "Groceries", category: "Food", amount: 250, date: "2024-11-10" },
    { id: 3, name: "Electricity Bill", category: "Utilities", amount: 100, date: "2024-11-05" },
  ];

  // Filter data based on report type and date range
  const filteredExpenses = mockExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date).getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return expenseDate >= start && expenseDate <= end;
  });

  res.status(200).json(filteredExpenses);
};

export default handler;
