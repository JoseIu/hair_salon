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
    date_quote: new Date(date.date_quote).toLocaleString(),
    user_id: date.user_id,
    services: date.serive.map(ds => ds.service.name)
  }));

  return responseClient(res, 200, formattDates);
};

const getMyDates = async (req: Request, res: Response) => {
  const { userAuth } = req.body;
  const dates = await prisma.date.findMany({
    where: {
      user_id: userAuth.user_id
    },
    include: {
      serive: {
        include: {
          service: true
        }
      }
    }
  });

  const formatDates = dates.map(date => ({
    ...date,
    date_quote: new Date(date.date_quote).toLocaleString(),
    serive: date.serive.map(ds => ds.service.name)
  }));
  return responseClient(res, 200, formatDates);
};

//CRUD
const createNewDate = async (req: Request, res: Response) => {
  const { date_quote, user_id, service_id } = req.body;

  console.log({ date_quote: new Date(date_quote).toISOString() });

  const newDate = await prisma.date.create({
    data: {
      date_quote: new Date(date_quote),
      user: { connect: { user_id } }
    }
  });

  // get the dateID created
  const date_id = newDate.date_id;

  await prisma.date_service.createMany({
    data: service_id.map((service_id: number) => ({
      date_id,
      service_id
    }))
  });

  const services = await prisma.date_service.findMany({
    where: { date_id },
    include: {
      service: true
    }
  });

  const formatDates = {
    ...newDate,
    date_quote: new Date(newDate.date_quote).toLocaleString(),
    services: services.map(ds => ds.service.name)
  };

  return responseClient(res, 201, formatDates);
};

const updateDate = async (req: Request, res: Response) => {
  const { date_id } = req.params;
  const dateIdToNumber = parseInt(date_id);

  const { date_quote, service_id, userAuth } = req.body;

  const { updateDate } = await prisma.$transaction(async () => {
    const updateDate = await prisma.date.update({
      where: { date_id: dateIdToNumber },
      data: {
        date_quote: new Date(date_quote),
        user_id: userAuth.user_id
      }
    });

    await prisma.date_service.deleteMany({
      where: { date_id: dateIdToNumber }
    });

    await prisma.date_service.createMany({
      data: service_id.map((service_id: number) => ({
        date_id: dateIdToNumber,
        service_id
      }))
    });

    return { updateDate };
  });
  const services = await prisma.date_service.findMany({
    where: { date_id: dateIdToNumber },
    include: {
      service: true
    }
  });

  const formatDates = {
    ...updateDate,
    date_quote: new Date(updateDate.date_quote).toLocaleString(),
    services: services.map(ds => ds.service.name)
  };

  return responseClient(res, 200, formatDates);
};

export default {
  getAllDates: catchError(getAllDates),

  createNewDate: catchError(createNewDate),
  getMyDates: catchError(getMyDates),
  updateDate: catchError(updateDate)
};
