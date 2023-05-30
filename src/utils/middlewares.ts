import jwt from "jsonwebtoken";
import { Request, RequestHandler } from "express";
import { JWT_SECRET } from "../config";
import { UserPayload } from "../interfaces/user.interface";

const extractToken = (req: Request) => {
  const auth = req.headers.authorization;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const [, token] = auth.split(' ');
    return token;
  }
}

export const protect: RequestHandler = (req, res, next) => {
  const token = extractToken(req)
  if (token) {
    req.user = jwt.verify(token, JWT_SECRET) as UserPayload
    next()
  } else res.status(401).json({ error: 'token required' })
}