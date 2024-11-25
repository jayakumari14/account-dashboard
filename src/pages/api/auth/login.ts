// pages/api/auth/login.ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }

      // Compare hashed password with the password provided by the user
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password." });
      }

      // Create a session or JWT token for the user
      const token = sign({ userId: user.id }, process.env.NEXTAUTH_SECRET as string, { expiresIn: "1h" });

      // Send the token back to the client
      return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
