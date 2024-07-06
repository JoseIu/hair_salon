import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { prisma } from '../config/conectDb';

const userLogin = async (req: Request, res: Response) => {
  res.send('User login');
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
  res.json(newUser);
};

export { userLogin, userRegister };
