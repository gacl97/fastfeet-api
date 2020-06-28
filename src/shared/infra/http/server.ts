import 'reflect-metadata'; // Utilizar sintaxe de decorators
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';

import AppError from '../../errors/AppError';

// Injecoes de repositorios
import '@shared/container';
// Conexao com DB
import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333);
