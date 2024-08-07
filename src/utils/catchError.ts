import { NextFunction, Request, Response } from 'express';

export const catchError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((err: Error) => next(err));
  };
};
