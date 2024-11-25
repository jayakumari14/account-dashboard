import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Create a new expense
    const { name, category, amount, date } = req.body;
    try {
      const expense = await prisma.expense.create({
        data: { name, category, amount: parseFloat(amount), date },
      });
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: "Failed to create expense" });
      console.error("Error creating expense:", error);
    }
  } else if (req.method === "GET") {
    // Get all expenses
    try {
      const expenses = await prisma.expense.findMany();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch expenses" });
      console.error("Error fetching expenses:", error);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
