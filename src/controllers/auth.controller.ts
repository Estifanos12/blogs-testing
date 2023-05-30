import { RequestHandler } from "express";
import { CredentialValidation } from "../validation/auth.validation";
import { ValidationError } from "joi";
import authService from "../services/auth.services";

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = await CredentialValidation.validateAsync(req.body)
    const token = await authService.login(email, password)
    if (token) 
      res.json({ token })
     else 
      res.status(401).json({error: 'invalid credentials'})
  } catch (error) {
    if (error instanceof ValidationError) 
      res.status(400).json({error: error.message})
  }
}