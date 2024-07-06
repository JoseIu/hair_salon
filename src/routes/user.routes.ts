import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/user.controller';
import { loginDTO, registerDTO } from '../dtos/auth';

export const usersRouter = Router();

usersRouter.post('/login', loginDTO, userLogin);
usersRouter.post('/register', registerDTO, userRegister);
