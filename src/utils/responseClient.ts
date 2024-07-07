import { Response } from 'express';

export const responseClient = (res: Response, statusCode: number = 200, data: any) => {
  res.status(statusCode).json({
    error: false,
    data
  });
};
