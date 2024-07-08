import { Router } from 'express';
import dateController from '../controllers/date.controller';
import { checkAuth } from '../middlewares/auth.middleware';
import { isDateOcupied } from '../middlewares/isDateOcupied';

export const dateRoute = Router();

dateRoute.get('/my-dates', checkAuth, dateController.getMyDates);

dateRoute.get('/date', dateController.getAllDates);

dateRoute.post('/date', isDateOcupied, dateController.createNewDate);

dateRoute.put('/date/:date_id', checkAuth, isDateOcupied, dateController.updateDate);
