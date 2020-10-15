import express from 'express';
import cors from 'cors';
import path from 'path';

import './database/connection';

import routes from './routes';

class App {
  public app: express.Application

  public constructor() {
    this.app = express();

    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  }

  private routes(): void {
    this.app.use(routes);
  }
}

export default new App().app;
