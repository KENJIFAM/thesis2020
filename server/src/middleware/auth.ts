import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../models/User';

//Authentication
export const checkLogIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) =>
      decoded ? next() : next({ status: 401, message: 'Please log in first!' }),
    );
  } catch (err) {
    return next({ status: 401, message: 'Please log in first!' });
  }
};

//Authorization
export const checkCorrectUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) =>
      (decoded as JwtPayload)?.id === req.body.id
        ? next()
        : next({ status: 401, message: 'Unauthorized!' }),
    );
  } catch (err) {
    return next({ status: 401, message: 'Unauthorized!' });
  }
};
