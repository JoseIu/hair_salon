import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/conectDb';
import { ErrorClient } from '../utils/errorClient';

const SECRET_KEY = process.env.SECRET_KEY;

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ error: true, message: 'Unauthorized' });
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    const { id } = decoded as { id: number };

    req.body.userAuth = await prisma.user.findUnique({
      where: {
        user_id: id
      }
    });
    return next();
  } catch (error) {
    console.log(error);
    throw new ErrorClient('aaaaaaaaaa', 401);
  }
};
