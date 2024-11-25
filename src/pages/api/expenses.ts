import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const { name, category, amount, date } = req.body;
      console.log("Received Payload in API:", req.body);

      try {
        const parsedDate = new Date(date);
        console.log("Parsed Date:", parsedDate);
        console.log("Parsed Amount:", parseFloat(amount));

        const expense = await prisma.expense.create({
          data: { name, category, amount: parseFloat(amount), date: parsedDate },
        });
        res.status(201).json(expense);
        console.log("Expense Created:", expense);

        
      } catch (error) {
        console.error("Error Details:", error);
  res.status(500).json({ error: "Failed to create expense", details: error });
      }
    }
  }
