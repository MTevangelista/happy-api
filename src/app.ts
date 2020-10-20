import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

class App {
  public app: express.Application

  public constructor() {
    this.app = express();
    this.app.use(cors());

    this.routes();
    this.middleware();
  }

  private middleware(): void {
    this.app.use(express.json());

    this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
    this.app.use(errorHandler);
  }

  private routes(): void {
    this.app.use(routes);
  }
}

export default new App().app;
