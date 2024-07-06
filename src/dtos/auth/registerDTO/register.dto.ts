import { NextFunction, Request, Response } from 'express';
import { ErrorClient } from '../../../utils/errorClient';
import { registerSchema } from './registerSchema';

export const registerDTO = (req: Request, res: Response, next: NextFunction) => {
  const isValidDTO = registerSchema.safeParse(req.body);
  const messageError = isValidDTO.error?.errors.map(error => error.message).join(', ');

  if (!isValidDTO.success) throw new ErrorClient(messageError!, 400);
  next();
};
