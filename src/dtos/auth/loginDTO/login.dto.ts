import { NextFunction, Request, Response } from 'express';
import { ErrorClient } from '../../../utils/errorClient';
import { loginSchema } from './loginSchema';

export const loginDTO = (req: Request, res: Response, next: NextFunction) => {
  const isValidDTO = loginSchema.safeParse(req.body);
  const messageError = isValidDTO.error?.errors.map(error => error.message).join(', ');
  if (!isValidDTO.success) throw new ErrorClient(messageError!, 400);
  next();
};
