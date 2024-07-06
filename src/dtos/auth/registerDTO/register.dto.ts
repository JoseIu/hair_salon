import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { registerSchema } from './registerSchema';

export const registerDTO = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = registerSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
  }
};
