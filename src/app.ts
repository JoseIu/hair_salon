import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { usersRouter } from './routes/user.routes';
import { ErrorClient } from './utils/errorClient';

export const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use(usersRouter);

expressApp.use((err: ErrorClient, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode).json({
    error: true,
    message: err.message
  });
});
