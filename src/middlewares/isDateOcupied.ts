import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/conectDb';
import { ErrorClient } from '../utils/errorClient';

export const isDateOcupied = async (req: Request, res: Response, next: NextFunction) => {
  const { date_quote } = req.body;
  const { date_id } = req.params;
  try {
    //ONLY IF WE ARE CREATING A NEW DATE
    if (!date_id) {
      const existingDate = await prisma.date.findFirst({
        where: { date_quote: new Date(date_quote) }
      });
      if (existingDate) {
        throw new ErrorClient('Date is occupied', 400);
      }
      return next();
    }
    const existingDate = await prisma.date.findUnique({
      where: { date_id: parseInt(date_id) }
    });

    //ONLY WHEN WE ARE UPDATING A DATE
    const isDateEquuals = existingDate?.date_quote.getTime() === new Date(date_quote).getTime();

    if (isDateEquuals) {
      return next();
    }
    const dateOcupied = await prisma.date.findFirst({
      where: { date_quote: new Date(date_quote) }
    });

    if (dateOcupied) {
      throw new ErrorClient('Date is occupiedddddddddd', 400);
    }
    return next();
  } catch (err) {
    next(err);
  }
};
