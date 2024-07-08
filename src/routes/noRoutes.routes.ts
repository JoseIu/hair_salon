import { Router } from 'express';
import { ErrorClient } from '../utils/errorClient';

export const noRoutes = Router();

noRoutes.get('*', (req, res) => {
  throw new ErrorClient('No no, what are u doing? 😑', 404);
});
noRoutes.post('*', (req, res) => {
  throw new ErrorClient('No no, what are u doing? 😑', 404);
});
noRoutes.put('*', (req, res) => {
  throw new ErrorClient('No no, what are u doing? 😑', 404);
});
noRoutes.delete('*', (req, res) => {
  throw new ErrorClient('No no, what are u doing? 😑', 404);
});
noRoutes.patch('*', (req, res) => {
  throw new ErrorClient('No no, what are u doing? 😑', 404);
});
