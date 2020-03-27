import jwt from 'express-jwt';
import { Request } from 'express';

export interface AuthRequest extends Request {
  auth?: {
    id: string;
  };
}

export default jwt({
  secret: process.env.SECRET_KEY as string,
  userProperty: 'auth',
});
