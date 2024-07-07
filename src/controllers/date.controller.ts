import { Request, Response } from 'express';
import { prisma } from '../config/conectDb';
import { catchError } from '../utils/catchError';
import { responseClient } from '../utils/responseClient';

const getAllDates = async (req: Request, res: Response) => {
  const dates = await prisma.date.findMany({
    include: {
      serive: {
        include: {
          service: true
        }
      }
    }
  });

  const formattDates = dates.map(date => ({
    date_id: date.date_id,
    date_quote: date.date_quote,
    user_id: date.user_id,
    services: date.serive.map(ds => ds.service.name)
  }));

  return responseClient(res, 200, formattDates);
};

const createNewDate = async (req: Request, res: Response) => {
  const { date_quote, user_id, service_id } = req.body;

  const newDate = await prisma.date.create({
    data: {
      date_quote: new Date(date_quote),
      user: { connect: { user_id } }
    }
  });

  //get the dateID created
  const date_id = newDate.date_id;

  const dateServicesEntries = await prisma.date_service.createMany({
    data: service_id.map((service_id: number) => ({
      date_id,
      service_id
    }))
  });

  return res.status(201).json({ error: false, data: newDate, services: dateServicesEntries });
};

export default {
  getAllDates: catchError(getAllDates),

  createNewDate: catchError(createNewDate)
};
