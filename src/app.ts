import express from 'express';
import { usersRouter } from './routes/user.routes';

const expressApp = express();

const PORT = 3000;

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use(usersRouter);

expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
