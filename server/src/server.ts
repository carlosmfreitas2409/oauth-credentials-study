import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database';
import { routes } from './routes';
import { AppError } from './errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal Server Error - ${err.message}`
  });
})

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333!');
});
