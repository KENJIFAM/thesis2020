import { Request, Response, NextFunction } from 'express';

interface HttpException extends Error {
  status: number;
}

const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) =>
  res.status(err.status || 500).json({
    error: { message: err.message || 'Something went wrong!' },
  });

export default errorHandler;
