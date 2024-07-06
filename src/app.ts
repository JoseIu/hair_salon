import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { usersRouter } from './routes/user.routes';
import { ErrorClient } from './utils/errorClient';

const expressApp = express();

const PORT = 3000;

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use(usersRouter);

expressApp.use((err: ErrorClient, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.statusCode).json({
    error: true,
    message: err.message
  });
});

expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
