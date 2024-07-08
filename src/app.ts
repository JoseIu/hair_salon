import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { dateRoute } from './routes/date.routes';
import { noRoutes } from './routes/noRoutes.routes';
import { usersRouter } from './routes/user.routes';
import { ErrorClient } from './utils/errorClient';

export const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use(usersRouter);
expressApp.use(dateRoute);
expressApp.use(noRoutes);

expressApp.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorClient) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message
    });
  } else {
    res.status(500).json({
      error: true,
      message: err.message
    });
  }
});
