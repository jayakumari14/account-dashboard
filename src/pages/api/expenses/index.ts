import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, category, amount, date } = req.body;

    // Validate input fields
    if (!name || !category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Save expense to the database
      const expense = await prisma.expense.create({
        data: {
          name,
          category,
          amount: parseFloat(amount), // Ensure amount is a number
          date: new Date(date),
        },
      });

      return res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
      console.error("Error adding expense:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  }

  if (req.method === 'GET') {
    try {
      // Fetch expenses from the database
      const expenses = await prisma.expense.findMany();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch expenses' });
      console.log(error);
      
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

  return res.status(405).json({ message: "Method not allowed." });
}
