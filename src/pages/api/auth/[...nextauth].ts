import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Extending the NextAuth User type to include role
declare module "next-auth" {
  interface User {
    role: string;  // Adding role to the user type
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string } | undefined): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }
      
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return { id: user.id.toString(), email: user.email, name: user.name, role: user.role };
        }
      
        return null;
      }
      
    }),
  ],
 
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

export default NextAuth(options);
