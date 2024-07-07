import { Router } from 'express';
import dateController from '../controllers/date.controller';
import { isDateOcupied } from '../middlewares/isDateOcupied';

export const dateRoute = Router();
dateRoute.get('/date', dateController.getAllDates);

dateRoute.post('/date', isDateOcupied, dateController.createNewDate);
