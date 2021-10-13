import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import { UsersRoutes, RecipiesRoutes } from './routes/index.routes';

export class App {
  constructor(port) {
    this.app = express();
    this.port = port;

    this.Settings();
    this.Middleware();
    this.Routes();
  }

  Settings() {
    this.app.set('port', this.port || config.PORT);
  }

  Middleware() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  Routes() {
    this.app.use('/api/users', UsersRoutes);
    this.app.use('/api/recipies', RecipiesRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port:', this.app.get('port'));
  }
}
