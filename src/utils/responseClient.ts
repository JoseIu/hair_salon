import { Response } from 'express';

export const responseClient = (res: Response, statusCode: number, data?: any) => {
  res.status(statusCode).json({
    error: false,
    data
  });
};
