import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    verify(token, process.env.NEXTAUTH_SECRET as string);
    return res.status(200).json({ message: "Token is valid" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
    console.log(err);
    
  }
}
