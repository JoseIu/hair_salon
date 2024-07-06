import { Router } from 'express';
import userController from '../controllers/user.controller';
import { loginDTO, registerDTO } from '../dtos';

export const usersRouter = Router();

usersRouter.post('/login', loginDTO, userController.userLogin);
usersRouter.post('/register', registerDTO, userController.userRegister);
