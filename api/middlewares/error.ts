import {Request, Response, NextFunction} from 'express';
import {ErrorResponse} from '../utils/errorResponse';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = {...err};

  console.log('Error : ', err);

  error.message = err.message;

  if (err.code === 11000) {
    const message = 'Duplicate Field value error';
    error = new ErrorResponse(message, 400);
  }
  if (err.name === 'validationError') {
    const message: string[] = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    errors: [
      {
        field: 'none',
        message: error.message || 'Server error'
      }
    ]
  });
};
