import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/conectDb';
import { checkPWD } from '../helpers/checkPWD';
import { catchError } from '../utils/catchError';
import { ErrorClient } from '../utils/errorClient';
import { responseClient } from '../utils/responseClient';
const SECRET_KEY = process.env.SECRET_KEY;

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) throw new ErrorClient('User not found', 404);

  if ((await checkPWD(password, user.password.trim())) === false) throw new ErrorClient('Password incorrect', 400);

  const token = jwt.sign({ id: user.user_id, name: user.name }, SECRET_KEY!, { expiresIn: 86400 });

  const { password: _, ...userToSend } = user;

  responseClient(res, 200, { user: userToSend, token });
};

const userRegister = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      phone
    }
  });

  return responseClient(res, 201, newUser);
};

export default {
  userLogin: catchError(userLogin),
  userRegister: catchError(userRegister)
};
