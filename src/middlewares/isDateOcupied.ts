import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/conectDb';
import { ErrorClient } from '../utils/errorClient';

export const isDateOcupied = async (req: Request, res: Response, next: NextFunction) => {
  const { date_quote } = req.body;
  try {
    const dateOcupied = await prisma.date.findFirst({
      where: {
        date_quote: new Date(date_quote)
      }
    });

    if (dateOcupied) {
      throw new ErrorClient('Date is occupied', 400);
    }

    next();
  } catch (err) {
    next(err);
  }
};
