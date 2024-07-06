import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { loginSchema } from './loginSchema';

export const loginDTO = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }
  }
};
